import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ProductImageDialogProps {
  image: string;
  productName: string;
  trigger: React.ReactNode;
}

const ProductImageDialog = ({ image, productName, trigger }: ProductImageDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild onClick={(e) => e.stopPropagation()}>
        {trigger}
      </DialogTrigger>
      <DialogContent className="max-w-4xl p-0 bg-transparent border-none">
        <img
          src={image}
          alt={productName}
          className="w-full h-auto rounded-lg"
        />
      </DialogContent>
    </Dialog>
  );
};

export default ProductImageDialog;

