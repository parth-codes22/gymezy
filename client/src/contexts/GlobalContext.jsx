import { createContext, useContext, useState, useEffect } from "react";
import { addToast } from "@heroui/toast";
import { useNavigate } from "react-router-dom";
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Switch, useDisclosure } from "@heroui/react";
import { LogoutIcon } from "../assets/LogoutIcon";
import { jwtDecode } from "jwt-decode";

const GlobalContext = createContext({});

export const GlobalProvider = (props) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const navigateTo = useNavigate();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  // Auto-logout when token expires
  useEffect(() => {
    if (user?.token) {
      const decodedToken = jwtDecode(user.token);
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        handleLogout();
      }
    }
  }, [user]);

  const logout = () => onOpen();

  const handleLogout = () => {
    localStorage.removeItem("user");
    addToast({
      title: "Logout Successful",
      description: "You have logged out of the application.",
      color: "success",
    });
    setUser(null);
    navigateTo("/auth/login");
    navigateTo("/auth/login");
  };

  return (
    <GlobalContext.Provider value={{ user, setUser, logout }}>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} isDismissable={false} isKeyboardDismissDisabled={true}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex justify-start align-middle items-center w-full gap-1 text-2xl">
                <LogoutIcon /> Logout
              </ModalHeader>
              <ModalBody>
                <p>Are you sure you want to logout?</p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  No
                </Button>
                <Button color="primary" onPress={() => { handleLogout(); onClose(); }}>
                  Yes
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      {props.children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
