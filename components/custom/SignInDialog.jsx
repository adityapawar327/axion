"use client";
import React, { useContext } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { UserDetailContext } from "@/context/UserDetailContext";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import uuid4 from "uuid4";

function SignInDialog({ openDialog, closeDialog }) {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const CreateUser = useMutation(api.users.CreateUser);

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      console.log(tokenResponse);
      const userInfo = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        { headers: { Authorization: "Bearer " + tokenResponse?.access_token } }
      );

      console.log(userInfo);
      const user = userInfo.data;
      await CreateUser({
        name: user?.name,
        email: user?.email,
        picture: user?.picture,
        uid: uuid4(),
      });
      if (typeof window !== undefined) {
        localStorage.setItem("user", JSON.stringify(user));
      }
      setUserDetail(userInfo?.data);
      closeDialog(false);
    },
    onError: (errorResponse) => console.log(errorResponse),
  });

  return (
    <Dialog open={openDialog} onOpenChange={closeDialog}>
      <DialogContent
        className="bg-black/40 rounded-lg shadow-lg backdrop-blur-sm border border-white/20 p-6 max-w-md mx-auto"
      >
        <DialogHeader>
          <DialogTitle></DialogTitle>
          <DialogDescription>
            <div className="flex flex-col justify-center items-center gap-6">
              <h2 className="font-semibold text-3xl text-white">Welcome to Axion</h2>
              <p className="mt-2 text-center text-white opacity-75 text-lg">
                Sign in to continue exploring Axion's features.
              </p>
              <Button
                className="bg-blue-500 text-white hover:bg-blue-400 transition duration-300 w-full py-3 rounded-lg"
                onClick={() => googleLogin()}
              >
                Sign in With Google
              </Button>
              <p className="text-gray-300 text-sm mt-4 text-center">
                By signing in, you agree to Axion's terms and conditions.
              </p>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}

export default SignInDialog;
