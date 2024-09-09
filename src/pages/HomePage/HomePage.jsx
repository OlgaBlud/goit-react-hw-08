import css from "./HomePage.module.css";
const HomePage = () => {
  return (
    <section className={css.section}>
      <div className={css.sectionWrapper}>
        <h1 className={css.title}>Welcome to Phonebook!</h1>
        <p className={css.text}>Create your own personal book of contacts</p>
      </div>
    </section>
  );
};

export default HomePage;
