import { useState } from "react";

import { client } from "./client";

import { ConnectButton } from "thirdweb/react";

import { useActiveAccount, useWalletBalance } from "thirdweb/react";

import { arbitrum } from "thirdweb/chains";

import { useSendTransaction } from "thirdweb/react";

import { getContract } from "thirdweb";

import { prepareContractCall } from "thirdweb";

import "./App.css";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Input,
} from "@nextui-org/react";

import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/react";

function App() {
  const account = useActiveAccount();
  const address = account?.address;

  const tokenAddress = "0xA477C859f6560A5654DD7b3092F2eCA22F206f01";

  const { data: balance, isLoading } = useWalletBalance({
    client,
    chain: arbitrum,
    address,
    tokenAddress,
  });

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const contract = getContract({
    address: tokenAddress,
    chain: arbitrum,
    client,
  });

  const { mutate: sendTx, data: transactionResult } = useSendTransaction();

  const [to, setTo] = useState("");
  const [value, setValue] = useState("");

  async function sendToken() {
    const transaction = prepareContractCall({
      contract,
      method: "function transfer(address to, uint256 value)",
      params: [to, value],
    });
    sendTx(transaction);
  }

  return (
    <>
      {/* <MainNavbar /> */}
      <Navbar className="bg-white">
        <NavbarBrand>
          <a href="" className="text-2xl font-semibold text-[#18181b]">
            White Water
          </a>
        </NavbarBrand>
        <NavbarContent justify="center" className="hidden sm:flex sm:gap-10">
          <NavbarItem>
            <Link href="" className="text-md fonr-medium text-black opacity-80">
              Home
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="" className="text-md fonr-medium text-black opacity-80">
              About
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="" className="text-md fonr-medium text-black opacity-80">
              Buy
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link href="" className="text-md fonr-medium text-black opacity-80">
              Arbiscan
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
          <ConnectButton client={client} theme="light" />
        </NavbarContent>
      </Navbar>
      <main className="flex justify-center items-center mt-20 px-5">
        <div className="flex flex-col items-center px-5">
          <div className="px-5">
            <Card className="w-96 h-96 p-5">
              <CardHeader className="flex flex-col items-start">
                <p className="text-sm font-medium text-black opacity-80">
                  Your Balance
                </p>
                <h1 className="text-xl font-bold text-black">
                  {balance?.symbol} {balance?.displayValue}
                </h1>
              </CardHeader>
              <CardBody>
                <Button
                  onPress={onOpen}
                  color="primary"
                  className="text-md font-semibold"
                >
                  Send
                </Button>
                <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                  <ModalContent>
                    {(onClose) => (
                      <>
                        <ModalHeader>
                          <h1>Send WTR Token</h1>
                        </ModalHeader>
                        <ModalBody>
                          <Input
                            type="text"
                            label="Address"
                            value={to}
                            onChange={(e) => setTo(e.target.value)}
                          />
                          <Input
                            type="number"
                            label="Amount"
                            value={value}
                            onChange={(e) => setValue(e.target.value)}
                          />
                        </ModalBody>
                        <ModalFooter>
                          <Button color="primary" onClick={sendToken}>
                            Send
                          </Button>
                        </ModalFooter>
                      </>
                    )}
                  </ModalContent>
                </Modal>
              </CardBody>
              <CardFooter className="flex justify-center items-center">
                <p className="text-sm font-medium text-black opacity-80">
                  Transaction History
                </p>
              </CardFooter>
            </Card>
          </div>
          {/* <div className="flex flex-col items-center">
            <p className="text-xs font-medium text-black opacity-80">
              Your Balance
            </p>
            <h1 className="text-3xl font-bold text-black">
              {balance?.symbol}
              {balance?.displayValue}
            </h1>
          </div>
          <div className="flex gap-5">
            <button className="bg-black h-8 w-20 rounded-2xl text-sm font-semibold text-white">
              Send
            </button>
            <button className="bg-black h-8 w-20 rounded-2xl text-sm font-semibold text-white">
              Recaive
            </button>
          </div>
          <div className="flex justify-center items-center mt-16">
            <p className="text-sm font-normal text-black opacity-80">
              Transaction history not found
            </p>
          </div> */}
        </div>
      </main>
    </>
  );
}

export default App;
