using System;
using System.Collections.Generic;
using InventoryDAL;
using InventoryEntity;

namespace InventoryBLL
{
    public class proc_ImportPurchaseBillDetailChargeBLL //: IDisposible
    {
        public proc_ImportPurchaseBillDetailChargeBLL()
        {
            //proc_ImportPurchaseBillDetailChargeDAO = proc_ImportPurchaseBillDetailCharge.GetInstanceThreadSafe;
            proc_ImportPurchaseBillDetailChargeDAO = new proc_ImportPurchaseBillDetailChargeDAO();
        }

        public proc_ImportPurchaseBillDetailChargeDAO proc_ImportPurchaseBillDetailChargeDAO { get; set; }

        public List<proc_ImportPurchaseBillDetailCharge> GetByPBDetailId(long PBDetailId)
        {
            try
            {
                return proc_ImportPurchaseBillDetailChargeDAO.GetByPBDetailId(PBDetailId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Add(proc_ImportPurchaseBillDetailCharge _inv_PurchaseBillDetailCharge)
        {
            try
            {
                return proc_ImportPurchaseBillDetailChargeDAO.Add(_inv_PurchaseBillDetailCharge);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Update(proc_ImportPurchaseBillDetailCharge _inv_PurchaseBillDetailCharge)
        {
            try
            {
                return proc_ImportPurchaseBillDetailChargeDAO.Update(_inv_PurchaseBillDetailCharge);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(long ChargeId)
        {
            try
            {
                return proc_ImportPurchaseBillDetailChargeDAO.Delete(ChargeId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}