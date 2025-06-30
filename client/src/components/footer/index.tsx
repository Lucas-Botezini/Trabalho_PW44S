import React, { useEffect, useState } from "react";

const Footer: React.FC = () => {

   return (
      <div
         style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            width: "100%",
            zIndex: 1000,
            backgroundColor: "var(--surface-ground)",
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
         }}
         className="fixed top-0 left-0 w-full z-50"
         >
         {/* <Menubar model={items} start={start} end={end} /> */}
      </div>
   );
};

export default Footer;
