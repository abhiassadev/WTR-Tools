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

import { ethers } from "ethers";

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
  const [amount, setAmount] = useState("0");

  function sendToken() {
    const value = ethers.utils.parseUnits(amount, 18);
    const transaction = prepareContractCall({
      contract,
      method: "function transfer(address to, uint value)",
      params: [to, value],
    });
    sendTx(transaction);
  }

  return (
    <>
      <div className="absolute top-0 -z-10 h-full w-full bg-white">
        <div className="absolute bottom-auto left-auto right-0 top-0 h-[500px] w-[500px] -translate-x-[30%] translate-y-[20%] rounded-full bg-[rgba(173,109,244,0.5)] opacity-50 blur-[80px]"></div>
      </div>
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
        <div className="flex flex-col items-center">
          <div className="">
            <Card className="w-80 h-80 sm:w-96 sm:h-96 p-5">
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
                            // value={amount}
                            onChange={(e) => setAmount(e.target.value)}
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
        </div>
      </main>
    </>
  );
}

export default App;
