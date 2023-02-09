using System;
using System.Collections.Generic;
using InventoryDAL;
using InventoryEntity;

namespace InventoryBLL
{
    public class proc_ImportPurchaseBillOverHeadBLL //: IDisposible
    {
        public proc_ImportPurchaseBillOverHeadBLL()
        {
            //proc_ImportPurchaseBillOverHeadDAO = proc_ImportPurchaseBillOverHead.GetInstanceThreadSafe;
            proc_ImportPurchaseBillOverHeadDAO = new proc_ImportPurchaseBillOverHeadDAO();
        }

        public proc_ImportPurchaseBillOverHeadDAO proc_ImportPurchaseBillOverHeadDAO { get; set; }

        public List<proc_ImportPurchaseBillOverHead> GetAll()
        {
            try
            {
                return proc_ImportPurchaseBillOverHeadDAO.GetAll();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<proc_ImportPurchaseBillOverHead> GetByPBId(long PBId)
        {
            try
            {
                return proc_ImportPurchaseBillOverHeadDAO.GetByPBId(PBId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Add(proc_ImportPurchaseBillOverHead _inv_PurchaseBillOverHead)
        {
            try
            {
                return proc_ImportPurchaseBillOverHeadDAO.Add(_inv_PurchaseBillOverHead);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Update(proc_ImportPurchaseBillOverHead _inv_PurchaseBillOverHead)
        {
            try
            {
                return proc_ImportPurchaseBillOverHeadDAO.Update(_inv_PurchaseBillOverHead);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(long PBOverHeadId)
        {
            try
            {
                return proc_ImportPurchaseBillOverHeadDAO.Delete(PBOverHeadId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}