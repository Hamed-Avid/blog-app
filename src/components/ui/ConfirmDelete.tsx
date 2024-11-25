import { TrashIcon } from "@heroicons/react/24/outline";
import Button from "./Button";

type ConfirmDeleteProps = {
  resourceName: string;
  onClose: () => void;
  disabled: boolean;
  onConfirm: (event: React.FormEvent<HTMLFormElement>) => void;
};

export default function ConfirmDelete({
  resourceName,
  onClose,
  disabled,
  onConfirm,
}: ConfirmDeleteProps) {
  return (
    <div>
      <h2 className="mb-8 text-base font-bold text-secondary-700">
        آیا از حذف {resourceName} مطمین هستید؟
      </h2>
      <form onSubmit={onConfirm}>
        <div className="flex items-center justify-between gap-x-16">
          <Button
            className="flex-1"
            variant="outline"
            onClick={onClose}
            type="button"
          >
            لغو
          </Button>
          <Button
            type="submit"
            disabled={disabled}
            variant="danger"
            className="flex flex-1 items-center justify-center gap-x-2"
          >
            <TrashIcon className="w-5" />
            <span>حذف</span>
          </Button>
        </div>
      </form>
    </div>
  );
}
