import { client } from "../client";
import { ConnectButton } from "thirdweb/react";

import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";

function MainNavbar() {
  return (
    <>
      <Navbar className="bg-white">
        <NavbarBrand>
          <a href="" className="text-2xl font-semibold text-black">
            White Water
          </a>
        </NavbarBrand>
        <NavbarContent>
          <NavbarItem>
            <Link>Home</Link>
          </NavbarItem>
        </NavbarContent>
        <Button color="primary">Buy</Button>
      </Navbar>
      {/* // <div className="bg-transparent flex justify-center items-center h-20 px-20">
    //   <div className="flex justify-between items-center gap-10 w-full">
    //     <div className="flex justify-start">
    //       <a href="" className="text-3xl font-semibold text-white">
    //         WTR Tools
    //       </a>
    //     </div>
    //     <nav className="flex justify-center items-center">
    //       <ul className="flex items-center gap-10">
    //         <li>
    //           <a href="" className="text-sm font-medium text-white opacity-80">
    //             Home
    //           </a>
    //         </li>
    //         <li>
    //           <a href="" className="text-sm font-medium text-white opacity-80">
    //             About
    //           </a>
    //         </li>
    //         <li>
    //           <a href="" className="text-sm font-medium text-white opacity-80">
    //             Buy
    //           </a>
    //         </li>
    //         <li>
    //           <a href="" className="text-sm font-medium text-white opacity-80">
    //             Arbiscan
    //           </a>
    //         </li>
    //       </ul>
    //     </nav>
    //     <div className="flex justify-end items-center">
    //       <ConnectButton
    //         client={client}
    //         className="bg-white h-10 w-20 text-semibold"
    //       />
    //     </div>
    //   </div>
    // </div> */}
    </>
  );
}

export default Navbar;
