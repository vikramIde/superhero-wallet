export default {
  migrate(state, store) {
    const newState = { ...state };

    if (state.subaccounts) {
      const {
        state: { network },
      } = store;
      const networks = {
        ...network,
        ...(state.userNetworks || []).reduce((p, n) => ({ ...p, [n.name]: { ...n } }), {}),
      };
      const { networkId } = networks[state.current.network];
      state.subaccounts.forEach(({ aename, publicKey }) => {
        if (aename)
          newState.names.defaults = {
            ...newState.names.defaults,
            [`${publicKey}-${networkId}`]: aename,
          };
      });
    }

    return newState;
  },
};
