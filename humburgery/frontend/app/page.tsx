import LoginForm from "../components/LoginForm";


export default function Login() {
  return (
    <div className="flex flex-col">
      <div className="mt-50 mr-20 ml-auto ">
        <div>
          <h1 className="text-xl">ברוכים הבאים,</h1>
          <h6 className="text-5xl">להמבורגרי</h6>
        </div>
        <LoginForm/>
      </div>
    </div>
  );
}
