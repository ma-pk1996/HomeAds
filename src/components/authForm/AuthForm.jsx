import {
Form,
Link,
useSearchParams,
useActionData,
useNavigation,
} from 'react-router-dom';

import classes from './AuthForm.module.css';

export function AuthForm() {
    const data = useActionData();
    const navigation = useNavigation();

    const [searchParams] = useSearchParams();
    const isSignup = searchParams.get('mode') === 'signup';
    const isSubmitting = navigation.state === 'submitting';

    return (
        <>
        <Form method="post" className={classes.form}>
            <h1 className={classes.head}>{isSignup ? 'به سایت ما خوش آمدید' : 'ورود'}</h1>
            {data && data.errors && (
            <ul>
                {Object.values(data.errors).map((err) => (
                <li key={err}>{err}</li>
                ))}
            </ul>
            )}
            {data && data.message && <p>{data.message}</p>}
            <p>
            <label className={classes.lab} htmlFor="email">ایمیل</label>
            <input id="email" type="email" name="email" required />
            </p>
            <p>
            <label className={classes.lab} htmlFor="image">رمز عبور</label>
            <input id="password" type="password" name="password" required />
            </p>
            <div className={classes.actions}> 
            {!isSignup && <Link to={`?mode=${'signup'}`}>ثبت نام</Link>}
            {!isSignup && <p>کاربر جدید هستید؟</p>}
            {isSignup && <Link to={`?mode=${'login'}`}>ورود</Link>}
            {isSignup && <p>عضوهستید؟</p>}
            <button disabled={isSubmitting}>
                {isSignup ? 'ثبت نام' : 'ورود '}
            </button>
            </div>
        </Form>
        </>
    );
}
  
  