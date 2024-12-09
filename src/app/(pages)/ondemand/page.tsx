"use client";

import Image from "next/image";
import FileUpload from "@/components/ui/file-upload";


import React from 'react'
import { div } from "framer-motion/client";
import Footer from "@/components/Footer";
import SignupFormDemo from "@/components/form";

function ondemand() {
  return (
    <div className="">
    <FileUpload/>
    
    <Footer />

    </div>
  )
}

export default ondemand

