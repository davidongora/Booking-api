// profileController.js
const connectToDatabase = require('../db'); // Import the function directly

const updateProfile = async (req, res) => {
  const { userId } = req.params;
  const { academicQualifications, areasOfExpertise, availability, contactInformation } = req.body;
  try {
    const pool = await connectToDatabase(); // Call the function to get the pool
    const request = pool.request();
    const [result] = await request.query(
      'INSERT INTO Profiles (UserID, AcademicQualifications, AreasOfExpertise, Availability, ContactInformation) VALUES (@userId, @academicQualifications, @areasOfExpertise, @availability, @contactInformation) ON DUPLICATE KEY UPDATE AcademicQualifications=@academicQualifications, AreasOfExpertise=@areasOfExpertise, Availability=@availability, ContactInformation=@contactInformation',
      {
        userId,
        academicQualifications,
        areasOfExpertise,
        availability,
        contactInformation
      }
    );
    res.status(200).json({ message: 'Profile saved successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Profile save failed', err: error });
    console.log(error);
  }
};

const allProfiles = async (req, res) => {
  try {
    const pool = await connectToDatabase(); // Call the function to get the pool
    const request = pool.request();
    const result = await request.query('SELECT * FROM Profiles');
    res.json(result.recordset); // Use `recordset` to get the result rows
  } catch (error) {
    res.status(500).json({ error: 'Fetching profiles failed', err: error });
    console.log(error);
  }
};

module.exports = {
  allProfiles,
  updateProfile
};
