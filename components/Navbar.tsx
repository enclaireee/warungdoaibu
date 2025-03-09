// "use client";

// import React, { useEffect, useState, useRef } from "react";
// import Image from "next/image";
// import { Menu, X } from "lucide-react";
// import { useScroll, motion, useMotionValueEvent } from "framer-motion";
// import { handleLogout } from "@/app/hooks/useLogOut";
// import { usePathname } from "next/navigation";
// import { BookletLink } from "@/utils/information";
// import Link from "next/link";

// interface NavbarProps {
//   isLoggedIn: boolean;
// }

// const Navbar = ({ isLoggedIn }: NavbarProps) => {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const currentPath = usePathname();
//   const [isFirstRender, setIsFirstRender] = useState(currentPath === "/");
//   const mobileMenuRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     setIsFirstRender(false);
//   }, []);

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (
//         mobileMenuRef.current &&
//         !mobileMenuRef.current.contains(event.target as Node)
//       ) {
//         setIsMobileMenuOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   const toggleMobileMenu = () => {
//     setIsMobileMenuOpen(!isMobileMenuOpen);
//   };

//   const handleLinkClick = () => {
//     setIsMobileMenuOpen(false);
//   };

//   const { scrollY } = useScroll();
//   const [isHidden, setHidden] = useState(false);

//   useMotionValueEvent(scrollY, "change", (latest) => {
//     const previous = scrollY.getPrevious();
//     if (previous ? latest > previous : false) {
//       setHidden(true);
//     } else {
//       setHidden(false);
//     }
//   });

//   useEffect(() => {
//     let scrollTimer: NodeJS.Timeout;

//     const handleScroll = () => {
//       clearTimeout(scrollTimer);
//       scrollTimer = setTimeout(() => {
//         setHidden(false);
//       }, 1500);
//     };

//     window?.addEventListener("scroll", handleScroll);
//     return () => {
//       window?.removeEventListener("scroll", handleScroll);
//       clearTimeout(scrollTimer);
//     };
//   }, []);

//   return (
//     <div className="fixed z-[100] w-full px-4 py-3 lg:py-8 lg:px-16">
//       {/* Navbar for larger screens */}
//       <motion.div
//         className="hidden lg:flex justify-center w-full items-center"
//         initial={{ opacity: 0, y: isFirstRender ? -50 : 0 }}
//         variants={{
//           visible: { opacity: 1, y: 0 },
//           hidden: { opacity: 0, y: "-150%" },
//         }}
//         animate={isHidden ? "hidden" : "visible"}
//         transition={{
//           duration: isFirstRender ? 0.8 : 0.3,
//           ease: isFirstRender ? "easeOut" : "easeInOut",
//           delay: isFirstRender ? 1.5 : 0,
//         }}
//       >
//         <div
//           className="px-16 py-5 h-auto flex justify-between rounded-xl backdrop-blur-md shadow-lg w-full items-center"
//           style={{
//             background:
//               "linear-gradient(89.92deg, #383F96 -30.15%, #15394A 30.04%, #3A698C 66.29%, #55457E 120.87%, #504B80 120.88%)",
//             boxShadow: "0px 1px 12px rgba(0, 0, 0, 0.25)",
//           }}
//         >
//           <div className="w-auto">
//             <Link href="/">
//               <Image
//                 src="/menu/buaya.svg" // Use the buaya.svg image as the left icon
//                 alt="logo"
//                 className="w-16 h-16"
//               />
//             </Link>
//           </div>
//           <div className="w-auto flex justify-end space-x-8 items-center">
//             {/* Add other icons */}
//             <Link href="#" className="text-white">
//               <Image
//                 src="/menu/Notif.svg" // Use Notif.svg image for notifications
//                 alt="Notifications"
//                 className="w-6 h-6"
//               />
//             </Link>
//             <Link href="#" className="text-white">
//               <Image
//                 src="/menu/Buku.svg" // Use Buku.svg image for books
//                 alt="Books"
//                 className="w-6 h-6"
//               />
//             </Link>
//             <Link href="#" className="text-white">
//               <Image
//                 src="/menu/Pencil.svg" // Use Pencil.svg image for editing
//                 alt="Pencil"
//                 className="w-6 h-6"
//               />
//             </Link>
//             <Link href="#" className="text-white">
//               <Image
//                 src="/menu/User 05c.svg" // Use User 05c.svg image for the user
//                 alt="User"
//                 className="w-6 h-6"
//               />
//             </Link>

//             {isLoggedIn && (
//               <button
//                 className="text-white tracking-wider text-xl hover:underline"
//                 onClick={handleLogout}
//               >
//                 Log Out
//               </button>
//             )}

//             {!isLoggedIn ? (
//               <Link
//                 href="/auth/login"
//                 className="text-[#15394A] text-xl font-bold bg-white rounded-full px-6 tracking-wider py-1 hover:bg-gray-50"
//               >
//                 Login
//               </Link>
//             ) : (
//               <Link
//                 href="/dashboard"
//                 className="text-[#15394A] text-xl font-bold bg-white rounded-full px-6 tracking-wider py-1 hover:bg-gray-50"
//               >
//                 Dashboard
//               </Link>
//             )}
//           </div>
//         </div>
//       </motion.div>

//       {/* Navbar for mobile screens */}
//       <motion.div
//         ref={mobileMenuRef}
//         className="lg:hidden flex flex-col h-auto relative items-start w-full"
//         initial={{ opacity: 0, y: isFirstRender ? -50 : 0 }}
//         variants={{
//           visible: { opacity: 1, y: 0 },
//           hidden: { opacity: 0, y: "-150%" },
//         }}
//         animate={isHidden ? "hidden" : "visible"}
//         transition={{
//           duration: isFirstRender ? 0.8 : 0.3,
//           ease: isFirstRender ? "easeOut" : "easeInOut",
//           delay: isFirstRender ? 1.5 : 0,
//         }}
//       >
//         <div
//           className={`w-full py-3 flex justify-between items-center px-6 shadow-xl ${
//             isMobileMenuOpen ? "rounded-t-xl" : "rounded-xl"
//           }`}
//           style={{
//             background:
//               "linear-gradient(98.41deg, #383F96 -6.59%, #0D2734 33.69%, #2B7696 57.86%, #55457E 94.11%, #504B80 94.11%)",
//           }}
//         >
//           <Link href="/" onClick={handleLinkClick}>
//             <Image
//               src="/menu/buaya.svg" // Use buaya.svg on mobile too
//               alt="logo"
//               className="w-16 aspect-contain"
//             />
//           </Link>

//           {isMobileMenuOpen ? (
//             <X size={37} color="white" onClick={toggleMobileMenu} />
//           ) : (
//             <Menu size={40} color="white" onClick={toggleMobileMenu} />
//           )}
//         </div>

//         {/* Dropdown menu */}
//         <motion.div
//           initial={{ opacity: 0, scaleY: 0, originY: 0 }}
//           animate={{ opacity: 1, scaleY: 1, originY: 0 }}
//           transition={{
//             duration: 0.2,
//             ease: "easeInOut",
//           }}
//           exit={{ opacity: 0, scaleY: 0, originY: 0 }}
//           className={`${
//             isMobileMenuOpen ? "block" : "hidden"
//           } w-full absolute top-[99%] rounded-b-xl shadow-xl flex flex-col space-y-3 px-5 pt-4 pb-8`}
//           style={{
//             background:
//               "linear-gradient(104.19deg, #383F96 -9.53%, #0D2734 24.8%, #2B7696 59.91%, #55457E 74.98%, #504B80 74.98%)",
//           }}
//         >
//           <Link href="#" className="text-white tracking-wide" onClick={handleLinkClick}>
//             <Image
//               src="/menu/Notif.svg"
//               alt="Notifications"
//               className="w-6 h-6"
//             />
//             Notifications
//           </Link>
//           <Link href="#" className="text-white tracking-wide" onClick={handleLinkClick}>
//             <Image
//               src="/menu/Buku.svg"
//               alt="Books"
//               className="w-6 h-6"
//             />
//             Books
//           </Link>
//           <Link href="#" className="text-white tracking-wide" onClick={handleLinkClick}>
//             <Image
//               src="/menu/Pencil.svg"
//               alt="Pencil"
//               className="w-6 h-6"
//             />
//             Edit
//           </Link>
//           <Link href="#" className="text-white tracking-wide" onClick={handleLinkClick}>
//             <Image
//               src="/menu/User 05c.svg"
//               alt="User"
//               className="w-6 h-6"
//             />
//             User Profile
//           </Link>

//           {!isLoggedIn ? (
//             <Link
//               href="/auth/login"
//               className="text-[#15394A] w-fit font-bold bg-white rounded-full px-10 shadow-sm shadow-white py-2"
//               onClick={handleLinkClick}
//             >
//               Login
//             </Link>
//           ) : (
//             <>
//               <button
//                 className="text-white tracking-wider text-start"
//                 onClick={() => {
//                   handleLinkClick();
//                   handleLogout();
//                 }}
//               >
//                 Log Out
//               </button>

//               <Link
//                 href="/dashboard"
//                 className="text-[#15394A] w-fit font-bold bg-white rounded-full px-10 shadow-sm shadow-white py-2"
//                 onClick={handleLinkClick}
//               >
//                 Dashboard
//               </Link>
//             </>
//           )}
//         </motion.div>
//       </motion.div>
//     </div>
//   );
// };

// export default Navbar;
