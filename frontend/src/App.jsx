import { CalendarDays, Home, LockKeyhole, LogIn, Mail, MapPin, User, UserPlus, VenusAndMars } from 'lucide-react';
import { useState } from 'react';

const initialLogin = {
  loginId: '',
  password: '',
};

const initialSignup = {
  loginId: '',
  password: '',
  birthDate: '',
  gender: '',
  email: '',
  address: '',
  nickname: '',
};

function App() {
  const [view, setView] = useState('login');
  const [loginForm, setLoginForm] = useState(initialLogin);
  const [signupForm, setSignupForm] = useState(initialSignup);
  const [errors, setErrors] = useState({});

  const isSignup = view === 'signup';

  const handleLoginChange = (event) => {
    const { name, value } = event.target;
    setLoginForm((form) => ({ ...form, [name]: value }));
    setErrors((current) => ({ ...current, [name]: '' }));
  };

  const handleSignupChange = (event) => {
    const { name, value } = event.target;
    setSignupForm((form) => ({ ...form, [name]: value }));
    setErrors((current) => ({ ...current, [name]: '' }));
  };

  const validateRequired = (form) => {
    const nextErrors = {};

    if (!form.loginId.trim()) {
      nextErrors.loginId = '아이디를 입력해주세요.';
    }

    if (!form.password.trim()) {
      nextErrors.password = '비밀번호를 입력해주세요.';
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleLogin = (event) => {
    event.preventDefault();

    if (validateRequired(loginForm)) {
      setErrors({ form: '로그인 요청을 보낼 준비가 완료되었습니다.' });
    }
  };

  const handleSignup = (event) => {
    event.preventDefault();

    if (validateRequired(signupForm)) {
      setErrors({ form: '회원가입 요청을 보낼 준비가 완료되었습니다.' });
    }
  };

  const showSignup = () => {
    setView('signup');
    setErrors({});
  };

  const showLogin = () => {
    setView('login');
    setErrors({});
  };

  return (
    <main className="auth-shell">
      <section className="brand-panel" aria-label="Anything">
        <div>
          <p className="eyebrow">Anything</p>
          <h1>{isSignup ? '새 계정 만들기' : '다시 만나서 반가워요'}</h1>
          <p className="support-copy">
            {isSignup ? '필수 정보만 먼저 확인하고 나머지는 편하게 채워주세요.' : '아이디와 비밀번호로 계정에 로그인하세요.'}
          </p>
        </div>
      </section>

      <section className="auth-panel">
        <div className="panel-heading">
          <h2>{isSignup ? '회원가입' : '로그인'}</h2>
          <div className="view-switch" role="tablist" aria-label="화면 전환">
            <button className={!isSignup ? 'active' : ''} type="button" role="tab" aria-selected={!isSignup} onClick={showLogin}>
              로그인
            </button>
            <button className={isSignup ? 'active' : ''} type="button" role="tab" aria-selected={isSignup} onClick={showSignup}>
              회원가입
            </button>
          </div>
        </div>

        {isSignup ? (
          <SignupForm form={signupForm} errors={errors} onChange={handleSignupChange} onSubmit={handleSignup} />
        ) : (
          <LoginForm form={loginForm} errors={errors} onChange={handleLoginChange} onSubmit={handleLogin} onSignup={showSignup} />
        )}
      </section>
    </main>
  );
}

function LoginForm({ form, errors, onChange, onSubmit, onSignup }) {
  return (
    <form className="auth-form" onSubmit={onSubmit} noValidate>
      <Field
        icon={User}
        label="아이디"
        name="loginId"
        value={form.loginId}
        error={errors.loginId}
        onChange={onChange}
        autoComplete="username"
        required
      />
      <Field
        icon={LockKeyhole}
        label="비밀번호"
        name="password"
        type="password"
        value={form.password}
        error={errors.password}
        onChange={onChange}
        autoComplete="current-password"
        required
      />
      {errors.form && <p className="form-message">{errors.form}</p>}
      <div className="action-row">
        <button className="primary-button" type="submit">
          <LogIn size={18} aria-hidden="true" />
          로그인
        </button>
        <button className="secondary-button" type="button" onClick={onSignup}>
          <UserPlus size={18} aria-hidden="true" />
          회원가입
        </button>
      </div>
    </form>
  );
}

function SignupForm({ form, errors, onChange, onSubmit }) {
  return (
    <form className="auth-form" onSubmit={onSubmit} noValidate>
      <div className="form-grid">
        <Field
          icon={User}
          label="아이디"
          name="loginId"
          value={form.loginId}
          error={errors.loginId}
          onChange={onChange}
          autoComplete="username"
          required
        />
        <Field
          icon={LockKeyhole}
          label="비밀번호"
          name="password"
          type="password"
          value={form.password}
          error={errors.password}
          onChange={onChange}
          autoComplete="new-password"
          required
        />
        <Field icon={CalendarDays} label="생년월일" name="birthDate" type="date" value={form.birthDate} onChange={onChange} />
        <SelectField icon={VenusAndMars} label="성별" name="gender" value={form.gender} onChange={onChange} />
        <Field icon={Mail} label="이메일" name="email" type="email" value={form.email} onChange={onChange} autoComplete="email" />
        <Field icon={MapPin} label="주소" name="address" value={form.address} onChange={onChange} autoComplete="street-address" />
        <Field icon={Home} label="닉네임" name="nickname" value={form.nickname} onChange={onChange} autoComplete="nickname" />
      </div>
      {errors.form && <p className="form-message">{errors.form}</p>}
      <button className="primary-button full-width" type="submit">
        <UserPlus size={18} aria-hidden="true" />
        회원가입
      </button>
    </form>
  );
}

function Field({ icon: Icon, label, name, type = 'text', value, error, onChange, required = false, ...inputProps }) {
  return (
    <label className="field">
      <span className="label-text">
        {label}
        {required && <span aria-hidden="true">*</span>}
      </span>
      <span className={`input-wrap ${error ? 'has-error' : ''}`}>
        <Icon size={18} aria-hidden="true" />
        <input
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          aria-invalid={Boolean(error)}
          aria-describedby={error ? `${name}-error` : undefined}
          {...inputProps}
        />
      </span>
      {error && (
        <span className="error-text" id={`${name}-error`}>
          {error}
        </span>
      )}
    </label>
  );
}

function SelectField({ icon: Icon, label, name, value, onChange }) {
  return (
    <label className="field">
      <span className="label-text">{label}</span>
      <span className="input-wrap">
        <Icon size={18} aria-hidden="true" />
        <select name={name} value={value} onChange={onChange}>
          <option value="">선택</option>
          <option value="male">남성</option>
          <option value="female">여성</option>
          <option value="none">선택 안 함</option>
        </select>
      </span>
    </label>
  );
}

export default App;
