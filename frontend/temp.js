const fetchVisaTypesByConsultantId = () => {
  setIsLoading(true);
  axios
    .get(`${DEFAULT_URL}visatypes/getvisatypesbyconsultant/${user._id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.jwtToken}`,
      },
    })
    .then((response) => {
      setIsLoading(false);
      setVisas(response.data);
    })
    .catch((error) => {
      setIsLoading(false);
      setErrorMessage(error.response.data.detail);
      setAlertVisible(true);
    });
};
