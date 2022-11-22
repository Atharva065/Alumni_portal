import "./intro.css";

const Intro = () => {
  return (
    <div className="i">
      <div className="i-left">
        <div className="i-left-wrapper">
          <h2 className="i-intro">Our Vision and Mission</h2>
          <h1 className="i-name">Jspm's Alumni Cell</h1>
          <div className="i-title">
            <div className="i-title-wrapper">
              <div className="i-title-item">Connect</div>
              <div className="i-title-item">Promote</div>
              <div className="i-title-item">Mentor and channelize</div>
              <div className="i-title-item">Help and Support</div>
              <div className="i-title-item">Advice</div>
              <div className="i-title-item">Associate</div>
            </div>
          </div>
          <p className="i-desc">
            Jspm University Alumni Association shall serve as a platform to
            bridge the gap of student – alumni interaction driven by the ideals
            and values that shall ensure the upliftment of both present and
            future alumnus with support to build a social, knowledgeable and
            motivational capital for Jspm University and its students.
          </p>
        </div>
      </div>
      <div className="i-right">
        <div className="i-bg"></div>
        <img src={" "} alt="" className="i-img" />
      </div>
    </div>
  );
};

export default Intro;
