using System;
using System.Collections.Generic;
using SecurityDAL;
using SecurityEntity;

namespace SecurityBLL
{
    public class ad_ChargeTypeApplyBLL //: IDisposible
    {
        public ad_ChargeTypeApplyBLL()
        {
            //ad_ItemChargeApplyDAO = ad_ItemChargeApply.GetInstanceThreadSafe;
            ad_ItemChargeApplyDAO = new ad_ChargeTypeApplyDAO();
        }

        public ad_ChargeTypeApplyDAO ad_ItemChargeApplyDAO { get; set; }

        public List<ad_ChargeTypeApply> GetByChargeTypeId(int chargeTypeId)
        {
            try
            {
                return ad_ItemChargeApplyDAO.GetByChargeTypeId(chargeTypeId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public long Add(ad_ChargeTypeApply ad_ItemChargeApply)
        {
            try
            {
                return ad_ItemChargeApplyDAO.Add(ad_ItemChargeApply);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}