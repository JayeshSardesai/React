import Image from "next/image";
import fs from "fs/promises"

export default function Home() {
  const submitAction = async (e) => {
    "use server"
    console.log(e.get("name"), e.get("add"))
    fs.writeFile("jay.txt", "Hey Iam Jayesh")
  }
  return (
    <div className="w-2/3 mx-auto my-12">
      <form action={submitAction}>
        <div>
          <label htmlFor="name">Name</label>
          <input type="text" name="name" id="name" className="text-white mx-4" />
        </div>
        <div>
          <label htmlFor="add">Address</label>
          <input type="text" name="add" id="add" className="text-white mx-4" />
        </div>
        <div>
          <button className="border border-white">Submit</button>
        </div>
      </form>
    </div>
  );
}
