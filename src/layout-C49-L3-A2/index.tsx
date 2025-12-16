import TableSlide from "./table"

const LayoutC49L3A2 = () => {
  return (
        <div className="min-h-screen bg-[#F8FAFC] flex justify-start items-center p-2 flex-col gap-5">
      <div>
        <h4 className="text-3xl font-bold text-center text-black">
       PRIVILEGE
        </h4>
        <p className="text-lg text-black text-center ">In the grid you will see different categories related to privilege.</p>
        <p className="text-lg text-black text-center ">In the masterlist, you will see statements that correspond to each of the squares in the grid.</p> 
        
        <p className="text-lg text-black text-center ">Drag and place each statement into its appropriate square.</p>
      </div>
      

      <div>
        <TableSlide/>
      </div>
    </div>
  )
}

export default LayoutC49L3A2
