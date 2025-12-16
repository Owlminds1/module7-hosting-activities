import MyImage from '@/components/myImage'
import AudioRecorder from './audioRecorder'


const LayoutC50L1PCA = () => {
  return (
   <div className='bg-[#F8FCFA] min-h-screen flex justify-center items-center flex-col gap-5 p-5'>
       <div>
        <h4 className="text-3xl font-bold text-black">
         Transformation
        </h4>
      </div>
      <div className="grid grid-cols-12 w-full place-items-center">
        <div className="col-span-6  flex justify-center items-center w-full">
            <MyImage path='/C50Images/Choice.jpg'/>
        </div>
        <div className="col-span-6  w-full">
<AudioRecorder/>
        </div>
        
         </div>
    </div>
  )
}

export default LayoutC50L1PCA
