queue()
    .defer(d3.json, "/schooldonors/donations")
    .await(makeGraphs);

function makeGraphs(error, schoolDonorsDonations) {
    if(error) {
        console.error("makeGraphs error on receiving dataset:", error.statusText);
        throw error;
    }

    //Clean schoolDonorsDonations data
    var dateFormat = d3.time.format("%Y-%m-%d %H:%M:%S");
    schoolDonorsDonations.forEach(function (d) {
        d["date_posted"] = dateFormat.parse(d["date_posted"]);
        d["date_posted"].setDate(1);
        d["total_donations"] = +d["total_donations"];
    });

    //Create a crossfilter instance
    var ndx = crossfilter(schoolDonorsDonations);

    //Define Dimensions
    var dateDim = ndx.dimension(function (d) {
        return d["date_posted"];
    });
    var resourceTypeDim = ndx.dimension(function (d) {
        return d["resource_type"];
    });
    var povertyLevelDim = ndx.dimension(function (d) {
        return d["poverty_level"];
    });
    var stateDim = ndx.dimension(function (d) {
        return d["school_state"];
    });
    var primaryFocusAreaDim = ndx.dimension(function (d) {
        return d["primary_focus_area"];
    });
    var primaryFocusSubjectDim = ndx.dimension(function (d) {
        return d["primary_focus_subject"];
    });
    var gradeLevelDim = ndx.dimension(function (d) {
        return d["grade_level"];
    });
    var teachForAmericaDim = ndx.dimension(function (d) {
        return d["teacher_teach_for_america"];
    });
}
