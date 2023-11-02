const config = {
    apiUrlLogin: process.env.‎REACT_APP_LOGIN_API_URL,
    apiUrlLoginCheck: process.env.REACT_APP_REGISTER_API_URL,
    apiUrlRegister: process.env.REACT_APP_VERIFY_API_URL,
    apiUrlVerify: process.env.REACT_APP_FORGOT_API_URL,
    apiUrlForgot: process.env.REACT_APP_RESET_API_URL,
    apiUrlReset: process.env.REACT_APP_LOGINCHECK_API_URL,
    apiUrlLogout: process.env.REACT_APP_LOGOUT_API_URL,
    apiUrlVerifyForgot: process.env.REACT_APP_VERIFYFORGOT_API_URL,
    apiUrlFeedback: process.env.REACT_APP_FEEDBACK_API_URL,

    apiUrlWolframSteps: process.env.REACT_APP_WOLFRAM_STEP_API_URL,
    apiUrlWolframSpoken: process.env.REACT_APP_WOLFRAM_SPEECH_API_URL,
    apiUrlWolframLLM: process.env.REACT_APP_WOLFRAM_LLM_API_URL,
    apiUrlWolframChat: process.env.REACT_APP_WOLFRAM_CONVERSATION_API_URL
};
  
export default config;
