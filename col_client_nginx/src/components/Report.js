import React from "react";
import { connect } from "react-redux";
import { fetchData } from "../actions";
import BigCalendar from "react-big-calendar";
import moment from "moment";
import { Container } from "semantic-ui-react";

import "react-big-calendar/lib/css/react-big-calendar.css";
import "./styles.less";

class Report extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.props.fetchData();
  }

  render() {
    return <Container>{this.renderCalendar()}</Container>;
  }

  renderCalendar = () => {
    return (
      <BigCalendar
        style={{ padding: "2em", height: "30em" }}
        events={
          this.props.data.data
            ? this.props.data.data.map(event => {
                // var dateArray = event. -- need to split string value
                var time = event.time.split("T")[0].split("-");
                return {
                  title: `${event.study_session_results}`,
                  start: new Date(time[0], parseInt(time[1], 10) - 1, time[2]),
                  end: new Date(time[0], parseInt(time[1], 10) - 1, time[2])
                };
              })
            : []
        }
        defaultDate={new Date()}
        localizer={BigCalendar.momentLocalizer(moment)}
      />
    );
  };
}

function mapStateToProps(state) {
  return { data: state.data };
}
export default connect(mapStateToProps, { fetchData })(Report);
