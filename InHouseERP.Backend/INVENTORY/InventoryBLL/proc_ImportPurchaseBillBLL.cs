using System;
using System.Collections.Generic;
using System.Data.Common;
using System.Linq;
using InventoryDAL;
using InventoryEntity;
using SecurityEntity.INVENTORY.InventoryEntity;

namespace InventoryBLL
{
    public class proc_ImportPurchaseBillBLL //: IDisposible
    {
        public proc_ImportPurchaseBillBLL()
        {
            //proc_ImportPurchaseBillDAO = proc_ImportPurchaseBill.GetInstanceThreadSafe;
            proc_ImportPurchaseBillDAO = new proc_ImportPurchaseBillDAO();
        }

        public proc_ImportPurchaseBillDAO proc_ImportPurchaseBillDAO { get; set; }

        public List<proc_ImportPurchaseBill> GetAll(long? PBId = null)
        {
            try
            {
                return proc_ImportPurchaseBillDAO.GetAll(PBId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<inv_StockReceive> GetAllRecivedNo(int? SRID)
        {
            try
            {
                return proc_ImportPurchaseBillDAO.GetAllRecivedNo(SRID);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<inv_LocalPurchaseBill> LocalGetAll(long? LPBId = null)
        {
            try
            {
                return proc_ImportPurchaseBillDAO.LocalGetAll(LPBId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public List<proc_ImportPurchaseBill> GetBySupplierId(int SupplierId)
        {
            try
            {
                return proc_ImportPurchaseBillDAO.GetBySupplierId(SupplierId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<inv_LocalPurchaseBill> GetByLocalSupplierId(int SupplierId)
        {
            try
            {
                return proc_ImportPurchaseBillDAO.GetByLocalSupplierId(SupplierId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<proc_ImportPurchaseBillWithStockReceivedReference> GetPurchaseBillWithStockReceivedReferenceAfterSave(Int64 ? SRId)
        {
            try
            {
                return proc_ImportPurchaseBillDAO.GetPurchaseBillWithStockReceivedReferenceAfterSave(SRId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        
        public List<inv_PurchaseMaterialType> PurchaseMaterialTypeGet()
        {
            try
            {
                return proc_ImportPurchaseBillDAO.PurchaseMaterialTypeGet();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<inv_MaterialDemandVM> GetAllMaterialsDemandNo()
        {
            try
            {
                return proc_ImportPurchaseBillDAO.GetAllMaterialsDemandNo();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public List<proc_ImportPurchaseBill> GetPurchaseAcknowledgement(long SupplierId, DateTime FromDate, DateTime ToDate)
        {
            try
            {
                return proc_ImportPurchaseBillDAO.GetPurchaseAcknowledgement(SupplierId, FromDate, ToDate);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<proc_ImportPurchaseBill> GetDynamicForImportAndLocalPurchase(string whereCondition,
            string orderByExpression)
        {
            try
            {
                return proc_ImportPurchaseBillDAO.GetDynamicForImportAndLocalPurchase(whereCondition, orderByExpression);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<proc_ImportPurchaseBill> GetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                return proc_ImportPurchaseBillDAO.GetDynamic(whereCondition, orderByExpression);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<inv_LocalPurchaseBill> WarrantyAndSerialGetPaged(int startRecordNo, int rowPerPage,
            string whereClause, string sortColumn, string sortOrder, ref int rows)
        {
            try
            {
                return proc_ImportPurchaseBillDAO.WarrantyAndSerialGetPaged(startRecordNo, rowPerPage, whereClause, sortColumn,
                    sortOrder, ref rows);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<proc_ImportPurchaseBill> GetPaged(int startRecordNo, int rowPerPage, string whereClause, string sortColumn,
            string sortOrder, ref int rows)
        {
            try
            {
                return proc_ImportPurchaseBillDAO.GetPaged(startRecordNo, rowPerPage, whereClause, sortColumn, sortOrder,
                    ref rows);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<proc_ImportPurchaseBill> ImportGetPaged(int startRecordNo, int rowPerPage, string whereClause,
            string sortColumn, string sortOrder, ref int rows)
        {
            try
            {
                return proc_ImportPurchaseBillDAO.ImportGetPaged(startRecordNo, rowPerPage, whereClause, sortColumn, sortOrder,
                    ref rows);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<inv_LocalPurchaseBill> LocalGetPaged(int startRecordNo, int rowPerPage, string whereClause,
            string sortColumn, string sortOrder, ref int rows)
        {
            try
            {
                return proc_ImportPurchaseBillDAO.LocalGetPaged(startRecordNo, rowPerPage, whereClause, sortColumn, sortOrder,
                    ref rows);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<proc_ImportPurchaseBill> GetTopForReceive(int topQty)
        {
            try
            {
                return proc_ImportPurchaseBillDAO.GetTopForReceive(topQty);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<inv_LocalPurchaseBill> GetTopForLocalReceive(int topQty)
        {
            try
            {
                return proc_ImportPurchaseBillDAO.GetTopForLocalReceive(topQty);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<proc_ImportPurchaseBill> GetTopForWarrentyAndSerialNo(int topQty)
        {
            try
            {
                return proc_ImportPurchaseBillDAO.GetTopForWarrentyAndSerialNo(topQty);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<proc_ImportPurchaseBill> GetTopForImportWarrentyAndSerialNo(int topQty)
        {
            try
            {
                return proc_ImportPurchaseBillDAO.GetTopForImportWarrentyAndSerialNo(topQty);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<inv_LocalPurchaseBill> GetTopForLocalWarrentyAndSerialNo(int topQty)
        {
            try
            {
                return proc_ImportPurchaseBillDAO.GetTopForLocalWarrentyAndSerialNo(topQty);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public proc_ImportPurchaseBill GetById(long PBId)
        {
            try
            {
                return proc_ImportPurchaseBillDAO.GetAll(PBId).FirstOrDefault();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public string Add(proc_ImportPurchaseBillOwn _inv_PurchaseBill)
        {
            try
            {
                return proc_ImportPurchaseBillDAO.Add(_inv_PurchaseBill);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public string PurchaseBillWithStockReceivedReferenceSave(proc_ImportPurchaseBillWithStockReceivedReference _PurchaseBillWithStockReceivedReference)
        {
            try
            {
                return proc_ImportPurchaseBillDAO.PurchaseBillWithStockReceivedReferenceSave(_PurchaseBillWithStockReceivedReference);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public string LocalPBAdd(inv_LocalPurchaseBill local_inv_PurchaseBill)
        {
            try
            {
                return proc_ImportPurchaseBillDAO.LocalPBAdd(local_inv_PurchaseBill);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        

        public string LocalPBUpdate(inv_LocalPurchaseBill local_inv_PurchaseBill)
        {
            try
            {
                return proc_ImportPurchaseBillDAO.LocalPBUpdate(local_inv_PurchaseBill);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Update(proc_ImportPurchaseBillOwn _inv_PurchaseBill)
        {
            try
            {
                return proc_ImportPurchaseBillDAO.Update(_inv_PurchaseBill);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int UpdateApprove(proc_ImportPurchaseBill _inv_PurchaseBill)
        {
            try
            {
                return proc_ImportPurchaseBillDAO.UpdateApprove(_inv_PurchaseBill);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(long PBId)
        {
            try
            {
                return proc_ImportPurchaseBillDAO.Delete(PBId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        //public DbDataReader GetMaxPurchaseBillNo()
        //{
        //    try
        //    {
        //        return proc_ImportPurchaseBillDAO.GetMaxPurchaseBillNo();
        //    }
        //    catch (Exception ex)
        //    {

        //        throw ex;
        //    }
        //}
        public long GetMaxPurchaseBillNo()
        {
            try
            {
                return proc_ImportPurchaseBillDAO.GetMaxPurchaseBillNo();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public long GetMaxLocalPBNo( )
        {
            try
            {
                return proc_ImportPurchaseBillDAO.GetMaxLocalPBNo();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public DbDataReader GetMaxLocalPurchaseBillNo()
        {
            try
            {
                return proc_ImportPurchaseBillDAO.GetMaxLocalPurchaseBillNo();
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public int Acknowledge(proc_ImportPurchaseBill _inv_PurchaseBill)
        {
            try
            {
                return proc_ImportPurchaseBillDAO.Acknowledge(_inv_PurchaseBill);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        

        public List<proc_ImportPurchaseBill> GetForRealization(int financialCycleId, int supplierId)
        {
            try
            {
                return proc_ImportPurchaseBillDAO.GetForRealization(financialCycleId, supplierId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<proc_ImportPurchaseBill_Mushak> Get_Mushak6_1(int PBId, bool IsLocal)
        {
            try
            {
                return proc_ImportPurchaseBillDAO.Get_Mushak6_1(PBId, IsLocal);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<proc_ImportPurchaseBill_Mushak> Get_Mushak6_2(int PBId)
        {
            try
            {
                return proc_ImportPurchaseBillDAO.Get_Mushak6_2(PBId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public List<inv_LocalPurchaseBillDetail> GetLocalPB(long LPBId)
        {
            try
            {
                return proc_ImportPurchaseBillDAO.GetLocalPB(LPBId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}