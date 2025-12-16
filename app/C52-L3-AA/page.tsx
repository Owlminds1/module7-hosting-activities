import MyImage from "@/components/myImage"


const Page = () => {
  return (
      <div className="min-h-screen bg-[#F8FAFC] flex justify-center items-center p-5 flex-col gap-5">
      <div>
        <h4 className="text-3xl font-bold text-black text-center">
         Gift card
        </h4>
        <p className="text-center text-black text-lg ">You have to choose the right gift card for a sibling to give on their birthday. How would you go about choosing it?
</p>
      </div>


      <div className="grid grid-cols-12 w-full">
        <div className="col-span-6 w-full flex justify-center items-center ">
            <MyImage path="/C52Images/Voucher.png"/>
        </div>


         <div className="col-span-6 w-full flex justify-center items-center ">
           <ul className="list-disc space-y-4 ">
            <li className="text-black"><span className="font-bold">Amount :</span> How much would it cost?</li>
            <li className="text-black"><span className="font-bold">Brand :</span> What brand would you choose?</li>
            <li className="text-black"><span className="font-bold">Ease of Use :</span> Where all can this gift card be used?</li>
            <li className="text-black"><span className="font-bold">Secure Transactions :</span> Where will you purchase it?</li>
            <li className="text-black"><span className="font-bold">Validity :</span> How long can this gift card be used?</li>
           </ul>
        </div>
      </div>
      
    </div>
  )
}

export default Page
