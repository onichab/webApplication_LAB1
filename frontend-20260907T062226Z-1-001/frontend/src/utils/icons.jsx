import {
  Calculator,
  BookOpen,
  Headphones,
  Laptop,
  NotebookText,
  PenTool,
  Sofa,
  Gamepad2,
  Boxes,
  Search,
  ShoppingCart,
  User,
  Star,
  Heart,
  ArrowRight,
  Edit,
  Trash,
  XCircle,
  Package,
  UploadCloud,
  LogOut,
  Plus,
  PackageOpen,
  Moon,
  Sun,
  Bell
} from 'lucide-react';

// Central registry so components can reference icons by name (string)
// coming from data files, instead of importing lucide-react everywhere.
export const iconMap = {
  Calculator,
  BookOpen,
  Headphones,
  Laptop,
  NotebookText,
  PenTool,
  Sofa,
  Gamepad2,
  Boxes,
  Search,
  ShoppingCart,
  User,
  Star,
  Heart,
  ArrowRight,
  Edit,
  Trash,
  XCircle,
  Package,
  UploadCloud,
  LogOut,
  Plus,
  PackageOpen,
  Moon,
  Sun,
  Bell
};

export function Icon({ name, ...props }) {
  const Cmp = iconMap[name] || Boxes;
  return <Cmp {...props} />;
}
