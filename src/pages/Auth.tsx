import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import PageHeader from "@/components/shared/PageHeader";
import SignInForm from "@/components/auth/SignInForm";
import SignUpForm from "@/components/auth/SignUpForm";
import { useAuth } from "@/contexts/AuthContext";

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  const breadcrumbs = [
    { label: "Home", href: "/" },
    { label: isSignUp ? "Create Account" : "Sign In" },
  ];

  // Redirect if already logged in
  useEffect(() => {
    if (!loading && user) {
      navigate("/account");
    }
  }, [user, loading, navigate]);

  const handleSuccess = () => {
    navigate("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <PageHeader
        title={isSignUp ? "Create Account" : "Sign In"}
        breadcrumbs={breadcrumbs}
      />

      <section className="py-12 md:py-16">
        <div className="container-custom">
          <div className="max-w-md mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-card rounded-2xl shadow-lg p-8"
            >
              {/* Tab Toggle */}
              <div className="flex mb-8 border-b border-border">
                <button
                  onClick={() => setIsSignUp(false)}
                  className={`flex-1 pb-4 text-center body-1-bold transition-colors relative ${
                    !isSignUp
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Sign In
                  {!isSignUp && (
                    <motion.div
                      layoutId="authTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent"
                    />
                  )}
                </button>
                <button
                  onClick={() => setIsSignUp(true)}
                  className={`flex-1 pb-4 text-center body-1-bold transition-colors relative ${
                    isSignUp
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Create Account
                  {isSignUp && (
                    <motion.div
                      layoutId="authTab"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-accent"
                    />
                  )}
                </button>
              </div>

              {/* Forms */}
              <motion.div
                key={isSignUp ? "signup" : "signin"}
                initial={{ opacity: 0, x: isSignUp ? 20 : -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                {isSignUp ? (
                  <SignUpForm onSuccess={handleSuccess} />
                ) : (
                  <SignInForm onSuccess={handleSuccess} />
                )}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Auth;
