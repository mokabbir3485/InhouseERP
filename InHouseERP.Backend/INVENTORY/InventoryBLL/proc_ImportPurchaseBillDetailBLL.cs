using System;
using System.Collections.Generic;
using InventoryDAL;
using InventoryEntity;
using SecurityEntity.INVENTORY.InventoryEntity;

namespace InventoryBLL
{
    public class proc_ImportPurchaseBillDetailBLL //: IDisposible
    {
        public proc_ImportPurchaseBillDetailBLL()
        {
            //proc_ImportPurchaseBillDetailDAO = proc_ImportPurchaseBillDetail.GetInstanceThreadSafe;
            proc_ImportPurchaseBillDetailDAO = new proc_ImportPurchaseBillDetailDAO();
        }

        public proc_ImportPurchaseBillDetailDAO proc_ImportPurchaseBillDetailDAO { get; set; }

        public List<proc_ImportPurchaseBillDetail> GetAllLocalAndImport(long PBId, bool IsLocal)
        {
            try
            {
                return proc_ImportPurchaseBillDetailDAO.GetAllLocalAndImport(PBId, IsLocal);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<proc_ImportPurchaseBillDetail> GetAll()
        {
            try
            {
                return proc_ImportPurchaseBillDetailDAO.GetAll();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
       

        public List<proc_PurchaseBillNo_GetForVDSIssue> proc_PurchaseBillNo_GetForVDSIssue()
        {
            try
            {
                return proc_ImportPurchaseBillDetailDAO.proc_PurchaseBillNo_GetForVDSIssue();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<proc_ImportPurchaseBillDetail> GetByPBId(long PBId)
        {
            try
            {
                return proc_ImportPurchaseBillDetailDAO.GetByPBId(PBId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<proc_ImportPurchaseBillDetail> UpdateForPurchaseBill(long IPBId)
        {
            try
            {
                return proc_ImportPurchaseBillDetailDAO.UpDateForPurchaseBill(IPBId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<inv_LocalPurchaseBillDetail> UpdateForLocalPurchaseBillGetById(long LPBId)
        {
            try
            {
                return proc_ImportPurchaseBillDetailDAO.UpdateForLocalPurchaseBillGetById(LPBId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        

        public int UpdateForLocalPurchaseBill(proc_LocalPurchaseBillDetailSave _inv_LocalPurchaseBillDetail)
        {
            try
            {
                return proc_ImportPurchaseBillDetailDAO.UpdateForLocalPurchaseBill(_inv_LocalPurchaseBillDetail);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<inv_LocalPurchaseBillDetail> LocalGetByPBId(long LPBId)
        {
            try
            {
                return proc_ImportPurchaseBillDetailDAO.LocalGetByPBId(LPBId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        

       
        public List<proc_ImportPurchaseBillDetail> GetSupplierLedger(int supplierId, string fromDate, string toDate)
        {
            try
            {
                return proc_ImportPurchaseBillDetailDAO.GetSupplierLedger(supplierId, fromDate, toDate);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<xrpt_inv_PurchaseBillReport> ImportPurchaseBillReport(long PBId)
        {
            try
            {
                return proc_ImportPurchaseBillDetailDAO.ImportPurchaseBillReport(PBId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public long Add(proc_ImportPurchaseBillDetail _inv_PurchaseBillDetail)
        {
            try
            {
                return proc_ImportPurchaseBillDetailDAO.Add(_inv_PurchaseBillDetail);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public long LocalPBDetailAdd(proc_LocalPurchaseBillDetailSave local_inv_PurchaseBillDetail)
        {
            try
            {
                return proc_ImportPurchaseBillDetailDAO.LocalPBDetailAdd(local_inv_PurchaseBillDetail);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Update(proc_ImportPurchaseBillDetail _inv_PurchaseBillDetail)
        {
            try
            {
                return proc_ImportPurchaseBillDetailDAO.Update(_inv_PurchaseBillDetail);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(long PBDetailId)
        {
            try
            {
                return proc_ImportPurchaseBillDetailDAO.Delete(PBDetailId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public int LocalPBDelete(long LPBDetailId)
        {
            try
            {
                return proc_ImportPurchaseBillDetailDAO.LocalPBDelete(LPBDetailId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        
    }
}