import Navbar from './component/Navbar'
import { useForm } from 'react-hook-form'
function App() {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors, isSubmitting },
  } = useForm()
  const delay = (d) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve()
      }, d * 1000)
    })
  }
  const onSubmit = async (data) => {
    // await delay(2)
    let r = await fetch("http://localhost:3000", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(data) })
    let res = await r.text()
    console.log(data, res)
    // if (data.username !== "jayesh") {
    //   setError("myform", { message: "Your form is not in good format" })
    // }
  }
  return (
    <>
      {isSubmitting && <div>Loading...</div>}
      <div className="containor">
        <form action="" onSubmit={handleSubmit(onSubmit)}>
          <input placeholder='username' {...register("username", { required: true, minLength: { value: 3, message: "Min length is 3" }, maxLength: { value: 18, message: "Max length is 8" } })} type="text" />
          {errors.username && <div className="red">{errors.username.message}</div>}
          <br />
          <input placeholder='password' {...register("password", { required: true, minLength: { value: 3, message: "Min length is 3" } })} type="password" />
          {errors.password && <div className="red">{errors.password.message}</div>}
          <br />
          <input type="submit" value="submit" />
          {errors.myform && <div className="red">{errors.myform.message}</div>}
        </form>
      </div>
    </>
  )
}

export default App
