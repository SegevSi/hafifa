import LoginForm from "../components/LoginForm";


export default function Login() {
  return (
    <div className="flex flex-row">
      <div className="mt-35 mr-30 ml-auto flex flex-col">
        <div>
          <div className="text-xl">ברוכים הבאים,</div>
          <div className="text-6xl mr-4">להמבורגרי</div>
        </div>
        <LoginForm/>
      </div>
        <img src="/images/logo.png" alt="img unavailable" className="w-175 h-150 m-20"/>
    </div>
  );
}
