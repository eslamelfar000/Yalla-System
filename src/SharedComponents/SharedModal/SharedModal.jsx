import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useMutate } from "@/hooks/UseMutate";
import { Icon } from "@iconify/react";
import { Link, useNavigate } from "react-router-dom";
import BtnLoading from "../BtnLoading/BtnLoading";
import useAuthToken from "@/hooks/use-auth-token";

export function SharedDialog({
  type,
  text,
  title,
  endpoint,
  loadingText,
  responseText,
  method,
}) {
  const navigate = useNavigate();
  const { removeToken } = useAuthToken();
  const { mutate, isPending } = useMutate({
    endpoint: endpoint,
    method: method,
    text: responseText,
    onSuccess: () => {
      if (type === "del-account") {
        navigate("/login");
        removeToken();
        localStorage.removeItem("yall_user_data");
      }
    },
  });

  return (
    <Dialog>
      <DialogTrigger asChild>
        {type === "del-account" ? (
          <Button
            asChild
            className="rounded w-40 text-white"
            size="sm"
            color="destructive"
          >
            <Link>
              <Icon
                className="w-4 h-4 ltr:mr-1 rtl:ml-1"
                icon="heroicons:trash"
              />
              Delete Account
            </Link>
          </Button>
        ) : (
          ""
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{text}</DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <DialogClose>
            <Button variant="outline" className="mr-2">
              Close
            </Button>
          </DialogClose>
          <Button
            disabled={isPending}
            type="submit"
            className="text-white w-35"
            color="destructive"
            onClick={() => {
              mutate();
            }}
          >
            {!!isPending ? <BtnLoading text={loadingText} /> : "Continue"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
