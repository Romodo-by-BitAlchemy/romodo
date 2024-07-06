const handleRerouting = (issue) => {
    console.log('Handling rerouting for issue:', issue);
    console.log('Rerouting to Vehicle No:', issue.reroutingNewVehicleNo);
    console.log('Rerouting to Driver No:', issue.reroutingNewDriverNo);
  
    // Add your rerouting logic here
    // For example, you might want to notify the new driver or update a different database collection
  
    // Simulate rerouting processing
    setTimeout(() => {
      console.log('Rerouting completed for issue:', issue);
    }, 2000);
  };
  
  module.exports = {
    handleRerouting
  };