export default function setDiskonValue(form, changedValues, allValues, fieldName, firstInputDiskon) {
  if (fieldName === "unit_2" && firstInputDiskon) {
    const diskonUnit_1 = changedValues.unit_1_dp1 || allValues.unit_1_dp1 || null;
    const diskonUnit_2 = changedValues.unit_1_dp2 || allValues.unit_1_dp2 || null;
    const diskonUnit_3 = changedValues.unit_1_dp3 || allValues.unit_1_dp3 || null;
    const diskonJualPersen = changedValues.disc_1_1 || allValues.disc_1_1 || null;

    form.setFieldsValue({
      unit_2_dp1: diskonUnit_1,
      unit_2_dp2: diskonUnit_2,
      unit_2_dp3: diskonUnit_3,
      disc_1_2: diskonJualPersen,
    });
  } else if (fieldName === "unit_3" && firstInputDiskon) {
    const diskonUnit_1 = changedValues.unit_1_dp1 || allValues.unit_1_dp1 || null;
    const diskonUnit_2 = changedValues.unit_1_dp2 || allValues.unit_1_dp2 || null;
    const diskonUnit_3 = changedValues.unit_1_dp3 || allValues.unit_1_dp3 || null;
    const diskonJualPersen = changedValues.disc_1_1 || allValues.disc_1_1 || null;

    form.setFieldsValue({
      unit_3_dp1: diskonUnit_1,
      unit_3_dp2: diskonUnit_2,
      unit_3_dp3: diskonUnit_3,
      disc_1_3: diskonJualPersen,
    });
  } else if (fieldName === "unit_4" && firstInputDiskon) {
    const diskonUnit_1 = changedValues.unit_1_dp1 || allValues.unit_1_dp1 || null;
    const diskonUnit_2 = changedValues.unit_1_dp2 || allValues.unit_1_dp2 || null;
    const diskonUnit_3 = changedValues.unit_1_dp3 || allValues.unit_1_dp3 || null;
    const diskonJualPersen = changedValues.disc_1_1 || allValues.disc_1_1 || null;

    form.setFieldsValue({
      unit_4_dp1: diskonUnit_1,
      unit_4_dp2: diskonUnit_2,
      unit_4_dp3: diskonUnit_3,
      disc_1_4: diskonJualPersen,
    });
  } else if (fieldName === "unit_5" && firstInputDiskon) {
    const diskonUnit_1 = changedValues.unit_1_dp1 || allValues.unit_1_dp1 || null;
    const diskonUnit_2 = changedValues.unit_1_dp2 || allValues.unit_1_dp2 || null;
    const diskonUnit_3 = changedValues.unit_1_dp3 || allValues.unit_1_dp3 || null;
    const diskonJualPersen = changedValues.disc_1_1 || allValues.disc_1_1 || null;

    form.setFieldsValue({
      unit_5_dp1: diskonUnit_1,
      unit_5_dp2: diskonUnit_2,
      unit_5_dp3: diskonUnit_3,
      disc_1_5: diskonJualPersen,
    });
  }
}