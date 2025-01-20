"use client";
import Image from "next/image";
import React, { useContext } from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { Download, Rocket, Menu } from "lucide-react";
import { useSidebar } from "../ui/sidebar";
import { usePathname } from "next/navigation";
import { UserDetailContext } from "@/context/UserDetailContext";
import { ActionContext } from "@/context/ActionContext";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useRouter } from "next/navigation";

function Header() {
  const { userDetail, setUserDetail } = useContext(UserDetailContext);
  const { setAction } = useContext(ActionContext);
  const { toggleSidebar } = useSidebar();
  const pathname = usePathname();
  const router = useRouter();

  const onActionBtn = (actn) => {
    setAction({
      actionType: actn,
      timeStamp: Date.now(),
    });
  };

  // Handle Google Login
  const googleLogin = useGoogleLogin({
    onSuccess: async (response) => {
      try {
        const { access_token } = response;
        const userInfo = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        });

        const user = userInfo.data;

        // Set user info in context
        setUserDetail(user);

        // Store user info in localStorage (optional)
        if (typeof window !== "undefined") {
          localStorage.setItem("user", JSON.stringify(user));
        }

        // Redirect user after successful login (optional)
        router.push("/"); // Redirect to home or dashboard page
      } catch (error) {
        console.error("Login error:", error);
      }
    },
    onError: (error) => {
      console.error("Google login error:", error);
    },
  });

  return (
    <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-md bg-background/75 border-b">
      <div className="max-w-7xl mx-auto sm:px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <Image
                src="/logo.png"
                alt="logo"
                width={40}
                height={40}
                className="transition-transform duration-200 hover:scale-105"
              />
            </Link>
          </div>

          {/* Navigation Section */}
          <div className="flex items-center gap-4">
            {!userDetail?.name ? (
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  className="bg-white text-black shadow-lg hover:shadow-white/50 hover:scale-105 transition-all duration-200 border border-gray-300"
                  onClick={() => googleLogin()}
                >
                  Sign In
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                {pathname.includes("/workspace/") && (
                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      onClick={() => onActionBtn("export")}
                      className="flex items-center gap-2 hover:bg-secondary transition-colors duration-200"
                    >
                      <Download className="w-4 h-4" />
                      <span className="hidden sm:inline">Export</span>
                    </Button>
                    <Button
                      onClick={() => onActionBtn("deploy")}
                      className="flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 shadow-lg hover:shadow-primary/25"
                    >
                      <Rocket className="w-4 h-4" />
                      <span className="hidden sm:inline">Deploy</span>
                    </Button>
                  </div>
                )}
                {userDetail && (
                  <div className="flex items-center gap-3">
                    <button onClick={toggleSidebar} className="relative group">
                      <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-primary to-primary/50 opacity-0 group-hover:opacity-100 transition duration-200" />
                      <Image
                        src={userDetail.picture || "/placeholder.svg"}
                        alt="User profile"
                        width={40}
                        height={40}
                        className="relative rounded-full object-cover ring-2 ring-background"
                      />
                    </button>
                    <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleSidebar}>
                      <Menu className="w-5 h-5" />
                      <span className="sr-only">Toggle menu</span>
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
