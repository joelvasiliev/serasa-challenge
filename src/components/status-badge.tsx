import { CheckIcon } from "lucide-react";
import { Badge } from "./ui/badge";

interface StatusBadgeProps {
  status: string;
  currentStatus: string;
  onClick?: () => void;
  label: string;
  className: string;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({
  status,
  currentStatus,
  onClick,
  label,
  className,
}) => {
  return (
    <Badge onClick={onClick} className={`cursor-pointer rounded-xl ${className}`}>
      {label}
      {currentStatus === status && <CheckIcon className="ml-1" size={14} />}
    </Badge>
  );
};

export default StatusBadge;
