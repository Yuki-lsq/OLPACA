import Image from 'next/image'

export default function Home() {
  return (
    <main>
      <h1 className="text-4xl pb-16 font-bold">Weather Aware Wardrobe</h1>
      <div className="flex pb-18"> This app will provide clothing recommendations based on the weather. </div>
      <hr className="h-px my-8 bg-gray-200 border-0 dark:bg-gray-700"/>
      <div className= "flex flex-row divide-x">
        <div className="flex flex-col px-8 container">
          input text boxes
        </div>
        <div className="flex flex-col px-8 container">
          output text boxes
        </div>
      </div>
    </main>
  )
}
