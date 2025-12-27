import MyImage from '@/components/myImage'
import AudioRecorder from './audioRecorder'


const LayoutC50L1PCA = () => {
  return (
   <div className='bg-[#F8FCFA] min-h-screen flex justify-center items-center flex-col gap-5 p-5'>
       <div>
        <h4 className="text-3xl font-bold text-center text-black">
         Transformation
        </h4>
        <p className='text-lg text-black text-center'>List three choices you’d make to change your actual habits with negative outcomes to aspirational habits with positive outcomes. <br />
        You can select from the following categories and frame senetences in your notebook:</p>
      </div>
      <div className="grid grid-cols-12 w-full place-items-center">
        <div className="col-span-6  flex justify-center items-center w-full">
            <MyImage path='/C50Images/Choice.jpg'/>
        </div>
        <div className="col-span-6  w-full flex justify-center items-center flex-col gap-3">
          <ul className='list-disc space-y-2 w-[40%] px-2'>
            <li className='text-black text-lg '>School</li>
            <li className='text-black text-lg '>Food</li>
            <li className='text-black text-lg '>Beverages</li>
            <li className='text-black text-lg '>Routine</li>
            <li className='text-black text-lg '>Playtime</li>
          </ul>
          <div>
            <h4 className='text-black text-lg '><span className='font-bold'>Example:</span>  Instead of a candy a day, I will eat a carrot a day. This choice will make me healthier.</h4>
            <h4 className='text-black text-lg '>Record your voice discussing in a sentence how these new choices will positively impact your life</h4>
          </div>
<AudioRecorder/>
        </div>
        
         </div>
    </div>
  )
}

export default LayoutC50L1PCA
