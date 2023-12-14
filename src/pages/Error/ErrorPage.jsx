import classes from "./ErrorPage.module.css";

export function ErrorPage() {
    return (
        <div className={classes.content}>
        <h3>... این راه به جایی نمی رسد</h3>
        <img className={classes.panda} src="https://www.elegantthemes.com/blog/wp-content/uploads/2020/02/000-404.png" alt="404 code" />
        </div>
    )
}

