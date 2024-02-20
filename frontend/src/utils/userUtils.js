const axios = require('axios');
const { DEFAULT_URL } = require('src/utils/Constant');

async function updateUserStatus(id, isActive, role) {
  try {
    console.log(id, isActive, role);

    const response = await axios.post(DEFAULT_URL + 'auth/updateuserstatus', {
      id: id,
      isActive,
      role: role
    });

    if (response.status === 200) {
      console.log(`${role.charAt(0).toUpperCase() + role.slice(1)} updated successfully`);
      return response.data;
    } else {
      throw new Error(`Failed to update ${role}`);
    }
  } catch (error) {
    console.error(error);
    throw new Error('Internal Server Error');
  }
}

module.exports = updateUserStatus;
