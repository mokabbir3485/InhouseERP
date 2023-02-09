using System;
using System.Collections.Generic;
using System.Data;
using DbExecutor;
using InventoryEntity;
using SecurityEntity.INVENTORY.InventoryEntity;

namespace InventoryDAL
{
    public class proc_ImportPurchaseBillDetailDAO //: IDisposible
    {
        private static volatile proc_ImportPurchaseBillDetailDAO instance;
        private static readonly object lockObj = new object();

        private readonly DBExecutor dbExecutor;

        public proc_ImportPurchaseBillDetailDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public static proc_ImportPurchaseBillDetailDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                    lock (lockObj)
                    {
                        if (instance == null) instance = new proc_ImportPurchaseBillDetailDAO();
                    }

                return instance;
            }
        }

        public static proc_ImportPurchaseBillDetailDAO GetInstance()
        {
            if (instance == null) instance = new proc_ImportPurchaseBillDetailDAO();
            return instance;
        }

        public List<proc_ImportPurchaseBillDetail> GetAllLocalAndImport(long PBId, bool IsLocal)
        {
            try
            {
                var inv_PurchaseBillDetailLst = new List<proc_ImportPurchaseBillDetail>();
                var colparameters = new Parameters[2]
                {
                    new Parameters("@PBId", PBId, DbType.Int64, ParameterDirection.Input),
                    new Parameters("@IsLocal", IsLocal, DbType.Boolean, ParameterDirection.Input)
                };
                inv_PurchaseBillDetailLst = dbExecutor.FetchData<proc_ImportPurchaseBillDetail>(CommandType.StoredProcedure,
                    "proc_PurchaseBillDetail_GetAllLocalAndImport ", colparameters);
                return inv_PurchaseBillDetailLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<proc_ImportPurchaseBillDetail> GetAll(long? PBDetailId = null, long? PBId = null)
        {
            try
            {
                var inv_PurchaseBillDetailLst = new List<proc_ImportPurchaseBillDetail>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@PBDetailId", PBDetailId, DbType.Int32, ParameterDirection.Input)
                };
                inv_PurchaseBillDetailLst = dbExecutor.FetchData<proc_ImportPurchaseBillDetail>(CommandType.StoredProcedure,
                    "inv_PurchaseBillDetail_Get", colparameters);
                return inv_PurchaseBillDetailLst;
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
                var inv_PurchaseBillDetailLst = new List<proc_ImportPurchaseBillDetail>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@PBId", PBId, DbType.Int64, ParameterDirection.Input)
                };
                inv_PurchaseBillDetailLst = dbExecutor.FetchData<proc_ImportPurchaseBillDetail>(CommandType.StoredProcedure,
                    "proc_ImportPurchaseBillDetail_GetByPBId", colparameters);
                return inv_PurchaseBillDetailLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<proc_PurchaseBillNo_GetForVDSIssue> proc_PurchaseBillNo_GetForVDSIssue( int ? SupplierId =null)
        {
            try
            {
                var inv_PurchaseBillDetailLst = new List<proc_PurchaseBillNo_GetForVDSIssue>();
                var colparameters = new Parameters[1]
                    {
                    new Parameters("@SupplierId", SupplierId, DbType.Int32, ParameterDirection.Input)
                    };
                inv_PurchaseBillDetailLst = dbExecutor.FetchData<proc_PurchaseBillNo_GetForVDSIssue>(CommandType.StoredProcedure,
                    "pay_SupplierPayment_GetBySupplierIdForVDSIssue", colparameters);
                return inv_PurchaseBillDetailLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        
        public List<proc_ImportPurchaseBillDetail> UpDateForPurchaseBill(long IPBId)
        {
            try
            {
                var inv_PurchaseBillDetailLst = new List<proc_ImportPurchaseBillDetail>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@IPBId",IPBId, DbType.Int64, ParameterDirection.Input)
                };
                inv_PurchaseBillDetailLst = dbExecutor.FetchData<proc_ImportPurchaseBillDetail>(CommandType.StoredProcedure,
                    "proc_ImportPurchaseBillDetail_GetByIPBId_ForEdit", colparameters);
                return inv_PurchaseBillDetailLst;
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
                var inv_LocalPurchaseBillDetailList = new List<inv_LocalPurchaseBillDetail>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@LPBId",LPBId, DbType.Int64, ParameterDirection.Input)
                };
                inv_LocalPurchaseBillDetailList = dbExecutor.FetchData<inv_LocalPurchaseBillDetail>(CommandType.StoredProcedure,
                    "proc_LocalPurchaseBillDetail_GetByLPBId_ForEdit", colparameters);
                return inv_LocalPurchaseBillDetailList;
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
                var inv_LocalPurchaseBillDetailLst = new List<inv_LocalPurchaseBillDetail>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@LPBId", LPBId, DbType.Int64, ParameterDirection.Input)
                };
                inv_LocalPurchaseBillDetailLst =
                    dbExecutor.FetchData<inv_LocalPurchaseBillDetail>(CommandType.StoredProcedure,
                        "proc_LocalPurchaseBillDetail_GetByPBId", colparameters);
                return inv_LocalPurchaseBillDetailLst;
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
                var inv_PurchaseBillDetailLst = new List<xrpt_inv_PurchaseBillReport>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@PBId", PBId, DbType.Int64, ParameterDirection.Input)
                };
                inv_PurchaseBillDetailLst =
                    dbExecutor.FetchData<xrpt_inv_PurchaseBillReport>(CommandType.StoredProcedure,
                        "xRpt_proc_ImportPurchaseBillByPBId", colparameters);
                return inv_PurchaseBillDetailLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }


        public long Add(proc_ImportPurchaseBillDetail _inv_PurchaseBillDetail)
        {
            long ret = 0;
            try
            {
                var colparameters = new Parameters[25]
                {

                    new Parameters("@PBId", _inv_PurchaseBillDetail.PBId, DbType.Int64, ParameterDirection.Input),
                    new Parameters("@PBDetailId", _inv_PurchaseBillDetail.PBDetailId, DbType.Int64, ParameterDirection.Input),
                    //new Parameters("@PBDetailId", _inv_PurchaseBillDetail.PBDetailId, DbType.Int64, ParameterDirection.Input),
                    new Parameters("@CategoryId", _inv_PurchaseBillDetail.CategoryId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@SubCategoryId", _inv_PurchaseBillDetail.SubCategoryId, DbType.Int32,ParameterDirection.Input),
                    new Parameters("@ItemId", _inv_PurchaseBillDetail.ItemId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@MaterialTypeId", _inv_PurchaseBillDetail.MaterialTypeId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@ItemName", _inv_PurchaseBillDetail.ItemName, DbType.String, ParameterDirection.Input),
                    new Parameters("@ItemDescription", _inv_PurchaseBillDetail.ItemDescription, DbType.String,ParameterDirection.Input),
                    new Parameters("@ItemDescriptionTwo", _inv_PurchaseBillDetail.ItemDescriptionTwo,DbType.String, ParameterDirection.Input),
                    new Parameters("@HsCodeId", _inv_PurchaseBillDetail.HsCodeId, DbType.Int32,ParameterDirection.Input),
                    new Parameters("@RollWidthInMeter", _inv_PurchaseBillDetail.RollWidthInMeter, DbType.Decimal, ParameterDirection.Input),
                    new Parameters("@RollLenghtInMeter", _inv_PurchaseBillDetail.RollLenghtInMeter, DbType.Decimal, ParameterDirection.Input),
                    new Parameters("@RollAreaInSqMeter", _inv_PurchaseBillDetail.RollAreaInSqMeter, DbType.Decimal, ParameterDirection.Input),
                    new Parameters("@PcPerRoll", _inv_PurchaseBillDetail.PcPerRoll, DbType.Decimal, ParameterDirection.Input),
                    new Parameters("@RollPerCarton", _inv_PurchaseBillDetail.RollPerCarton, DbType.Decimal,ParameterDirection.Input),
                    new Parameters("@UnitPerCarton", _inv_PurchaseBillDetail.UnitPerCarton, DbType.Decimal,ParameterDirection.Input),
                    new Parameters("@RollWeight", _inv_PurchaseBillDetail.RollWeight, DbType.Decimal, ParameterDirection.Input),
                    new Parameters("@CartonWeight", _inv_PurchaseBillDetail.CartonWeight, DbType.Decimal,  ParameterDirection.Input),
                    new Parameters("@CartonSize", _inv_PurchaseBillDetail.CartonSize, DbType.String, ParameterDirection.Input),
                    new Parameters("@UnitId", _inv_PurchaseBillDetail.UnitId, DbType.Int32,ParameterDirection.Input),
                    new Parameters("@Qty", _inv_PurchaseBillDetail.Qty, DbType.Decimal,ParameterDirection.Input),
                    new Parameters("@UnitPrice", _inv_PurchaseBillDetail.UnitPrice, DbType.Decimal,ParameterDirection.Input),
                    new Parameters("@Amount", _inv_PurchaseBillDetail.Amount, DbType.Decimal,ParameterDirection.Input),
                    new Parameters("@DiscountAmount", _inv_PurchaseBillDetail.DiscountAmount, DbType.Decimal,ParameterDirection.Input),
                    new Parameters("@TotalCostAfterDiscount", _inv_PurchaseBillDetail.TotalCostAfterDiscount, DbType.Decimal, ParameterDirection.Input),
                    
                    //new Parameters("@CurrencyType", _inv_PurchaseBillDetail.CurrencyType, DbType.String, ParameterDirection.Input),
                    //new Parameters("@ConversionRate", _inv_PurchaseBillDetail.ConversionRate, DbType.Decimal,ParameterDirection.Input),
                    //new Parameters("@TotalConversion", _inv_PurchaseBillDetail.TotalConversion, DbType.Decimal, ParameterDirection.Input),
                    //new Parameters("@TotalCost", _inv_PurchaseBillDetail.TotalCost, DbType.Decimal, ParameterDirection.Input),

    };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar64(true, CommandType.StoredProcedure, "proc_ImportPurchaseBillDetail_Post",
                    colparameters, true);
                dbExecutor.ManageTransaction(TransactionType.Commit);
            }
            catch (DBConcurrencyException except)
            {
                dbExecutor.ManageTransaction(TransactionType.Rollback);
                throw except;
            }
            catch (Exception ex)
            {
                dbExecutor.ManageTransaction(TransactionType.Rollback);
                throw ex;
            }

            return ret;
        }

        public long LocalPBDetailAdd(proc_LocalPurchaseBillDetailSave local_inv_PurchaseBillDetail)
        {
            long ret = 0;
            try
            {
  

                var colparameters = new Parameters[25]
                {
                    new Parameters("@LPBId", local_inv_PurchaseBillDetail.LPBId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@CategoryId", local_inv_PurchaseBillDetail.CategoryId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@SubCategoryId", local_inv_PurchaseBillDetail.SubCategoryId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@ItemId", local_inv_PurchaseBillDetail.ItemId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@MaterialTypeId", local_inv_PurchaseBillDetail.MaterialTypeId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@ItemName", local_inv_PurchaseBillDetail.ItemName, DbType.String,
                        ParameterDirection.Input),

                    new Parameters("@ItemDescription", local_inv_PurchaseBillDetail.ItemDescription, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@ItemDescriptionTwo", local_inv_PurchaseBillDetail.ItemDescriptionTwo, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@HsCodeId", local_inv_PurchaseBillDetail.HsCodeId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@RollWidthInMeter", local_inv_PurchaseBillDetail.RollWidthInMeter, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@RollLenghtInMeter", local_inv_PurchaseBillDetail.RollLenghtInMeter, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@PcPerRoll", local_inv_PurchaseBillDetail.PcPerRoll, DbType.Decimal,
                        ParameterDirection.Input),

                    new Parameters("@RollPerCarton", local_inv_PurchaseBillDetail.RollPerCarton,
                        DbType.Decimal, ParameterDirection.Input),
                    new Parameters("@UnitPerCarton", local_inv_PurchaseBillDetail.UnitPerCarton, DbType.Decimal,
                        ParameterDirection.Input),

                    new Parameters("@RollWeight", local_inv_PurchaseBillDetail.RollWeight, DbType.Decimal,
                        ParameterDirection.Input),

                    new Parameters("@CartonWeight", local_inv_PurchaseBillDetail.CartonWeight, DbType.Decimal,
                        ParameterDirection.Input),

                    new Parameters("@CartonSize", local_inv_PurchaseBillDetail.CartonSize, DbType.String,
                        ParameterDirection.Input),
  
                    new Parameters("@UnitId", local_inv_PurchaseBillDetail.UnitId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@Qty", local_inv_PurchaseBillDetail.Qty, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@UnitPrice", local_inv_PurchaseBillDetail.UnitPrice, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@Amount", local_inv_PurchaseBillDetail.Amount, DbType.Decimal,
                        ParameterDirection.Input),

                    new Parameters("@DiscountAmount", local_inv_PurchaseBillDetail.DiscountAmount, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@TotalCost", local_inv_PurchaseBillDetail.TotalCost, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@SdAmount", local_inv_PurchaseBillDetail.SdAmount, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@VatAmount", local_inv_PurchaseBillDetail.VatAmount, DbType.Decimal,
                        ParameterDirection.Input),
                   
                    
                      
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar64(true, CommandType.StoredProcedure,
                    "proc_LocalPurchaseBillDetail_Create", colparameters, true);
                dbExecutor.ManageTransaction(TransactionType.Commit);
            }
            catch (DBConcurrencyException except)
            {
                dbExecutor.ManageTransaction(TransactionType.Rollback);
                throw except;
            }
            catch (Exception ex)
            {
                dbExecutor.ManageTransaction(TransactionType.Rollback);
                throw ex;
            }

            return ret;
        }

        public int UpdateForLocalPurchaseBill(proc_LocalPurchaseBillDetailSave local_inv_PurchaseBillDetail)
        {
            var ret = 0;
            try
            {


                var colparameters = new Parameters[27]
                {
                    new Parameters("@LPBDetailId", local_inv_PurchaseBillDetail.LPBDetailId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@LPBId", local_inv_PurchaseBillDetail.LPBId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@CategoryId", local_inv_PurchaseBillDetail.CategoryId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@SubCategoryId", local_inv_PurchaseBillDetail.SubCategoryId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@ItemId", local_inv_PurchaseBillDetail.ItemId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@MaterialTypeId", local_inv_PurchaseBillDetail.MaterialTypeId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@ItemName", local_inv_PurchaseBillDetail.ItemName, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@ItemDescription", local_inv_PurchaseBillDetail.ItemDescription, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@ItemDescriptionTwo", local_inv_PurchaseBillDetail.ItemDescriptionTwo, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@HsCodeId", local_inv_PurchaseBillDetail.HsCodeId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@RollLenghtInMeter", local_inv_PurchaseBillDetail.RollLenghtInMeter, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@RollWidthInMeter", local_inv_PurchaseBillDetail.RollWidthInMeter, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@RollAreaInSqMeter", local_inv_PurchaseBillDetail.RollAreaInSqMeter,
                        DbType.Decimal, ParameterDirection.Input),
                    new Parameters("@PcPerRoll", local_inv_PurchaseBillDetail.PcPerRoll, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@RollPerCarton", local_inv_PurchaseBillDetail.RollPerCarton, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@UnitPerCarton", local_inv_PurchaseBillDetail.UnitPerCarton, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@RollWeight", local_inv_PurchaseBillDetail.RollWeight, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@CartonWeight", local_inv_PurchaseBillDetail.CartonWeight, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@CartonSize", local_inv_PurchaseBillDetail.CartonSize, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@UnitId", local_inv_PurchaseBillDetail.UnitId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@Qty", local_inv_PurchaseBillDetail.Qty, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@UnitPrice", local_inv_PurchaseBillDetail.UnitPrice, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@Amount", local_inv_PurchaseBillDetail.Amount, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@DiscountAmount", local_inv_PurchaseBillDetail.DiscountAmount, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@TotalCost", local_inv_PurchaseBillDetail.TotalCost, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@SdAmount", local_inv_PurchaseBillDetail.SdAmount, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@VatAmount", local_inv_PurchaseBillDetail.VatAmount, DbType.Decimal,
                        ParameterDirection.Input),


                };

                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "proc_LocalPurchaseBillDetail_Update",
                         colparameters, true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }

        }


        public int Update(proc_ImportPurchaseBillDetail _inv_PurchaseBillDetail)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[25]
                  {

                    new Parameters("@PBId", _inv_PurchaseBillDetail.PBId, DbType.Int64, ParameterDirection.Input),
                    new Parameters("@PBDetailId", _inv_PurchaseBillDetail.PBDetailId, DbType.Int64, ParameterDirection.Input),
                    new Parameters("@CategoryId", _inv_PurchaseBillDetail.CategoryId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@SubCategoryId", _inv_PurchaseBillDetail.SubCategoryId, DbType.Int32,ParameterDirection.Input),
                    new Parameters("@ItemId", _inv_PurchaseBillDetail.ItemId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@MaterialTypeId", _inv_PurchaseBillDetail.MaterialTypeId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@ItemName", _inv_PurchaseBillDetail.ItemName, DbType.String, ParameterDirection.Input),
                    new Parameters("@ItemDescription", _inv_PurchaseBillDetail.ItemDescription, DbType.String,ParameterDirection.Input),
                    new Parameters("@ItemDescriptionTwo", _inv_PurchaseBillDetail.ItemDescriptionTwo,DbType.String, ParameterDirection.Input),
                    new Parameters("@HsCodeId", _inv_PurchaseBillDetail.HsCodeId, DbType.Int32,ParameterDirection.Input),
                    new Parameters("@RollWidthInMeter", _inv_PurchaseBillDetail.RollWidthInMeter, DbType.Decimal, ParameterDirection.Input),
                    new Parameters("@RollLenghtInMeter", _inv_PurchaseBillDetail.RollLenghtInMeter, DbType.Decimal, ParameterDirection.Input),
                    new Parameters("@RollAreaInSqMeter", _inv_PurchaseBillDetail.RollAreaInSqMeter, DbType.Decimal, ParameterDirection.Input),
                    new Parameters("@PcPerRoll", _inv_PurchaseBillDetail.PcPerRoll, DbType.Decimal, ParameterDirection.Input),
                    new Parameters("@RollPerCarton", _inv_PurchaseBillDetail.RollPerCarton, DbType.Decimal,ParameterDirection.Input),
                    new Parameters("@UnitPerCarton", _inv_PurchaseBillDetail.UnitPerCarton, DbType.Decimal,ParameterDirection.Input),
                    new Parameters("@RollWeight", _inv_PurchaseBillDetail.RollWeight, DbType.Decimal, ParameterDirection.Input),
                    new Parameters("@CartonWeight", _inv_PurchaseBillDetail.CartonWeight, DbType.Decimal,  ParameterDirection.Input),
                    new Parameters("@CartonSize", _inv_PurchaseBillDetail.CartonSize, DbType.String, ParameterDirection.Input),
                    new Parameters("@UnitId", _inv_PurchaseBillDetail.UnitId, DbType.Int32,ParameterDirection.Input),
                    new Parameters("@Qty", _inv_PurchaseBillDetail.Qty, DbType.Decimal,ParameterDirection.Input),
                    new Parameters("@UnitPrice", _inv_PurchaseBillDetail.UnitPrice, DbType.Decimal,ParameterDirection.Input),
                    new Parameters("@Amount", _inv_PurchaseBillDetail.Amount, DbType.Decimal,ParameterDirection.Input),
                    new Parameters("@DiscountAmount", _inv_PurchaseBillDetail.DiscountAmount, DbType.Decimal,ParameterDirection.Input),
                    new Parameters("@TotalCostAfterDiscount", _inv_PurchaseBillDetail.TotalCostAfterDiscount, DbType.Decimal, ParameterDirection.Input),
                    //new Parameters("@CurrencyType", _inv_PurchaseBillDetail.CurrencyType, DbType.String, ParameterDirection.Input),
                    //new Parameters("@ConversionRate", _inv_PurchaseBillDetail.ConversionRate, DbType.Decimal,ParameterDirection.Input),
                    //new Parameters("@TotalConversion", _inv_PurchaseBillDetail.TotalConversion, DbType.Decimal, ParameterDirection.Input),
                    //new Parameters("@TotalCost", _inv_PurchaseBillDetail.TotalCost, DbType.Decimal, ParameterDirection.Input),

              };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "proc_ImportPurchaseBillDetail_Update",
                    colparameters, true);
                return ret;
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
                var SupplierLedgerlLst = new List<proc_ImportPurchaseBillDetail>();
                var colparameters = new Parameters[3]
                {
                    new Parameters("@supplierId", supplierId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@fromDate", fromDate, DbType.String, ParameterDirection.Input),
                    new Parameters("@toDate", toDate, DbType.String, ParameterDirection.Input)
                };
                SupplierLedgerlLst = dbExecutor.FetchData<proc_ImportPurchaseBillDetail>(CommandType.StoredProcedure,
                    "proc_SupplierLedger", colparameters);
                return SupplierLedgerlLst;
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
                var ret = 0;
                var colparameters = new Parameters[1]
                {
                    new Parameters("@PBDetailId", PBDetailId, DbType.Int32, ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "Proc_PurchaseBillDetail_DeleteById",
                    colparameters, true);
                return ret;
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
                var ret = 0;
                var colparameters = new Parameters[1]
                {
                    new Parameters("@LPBDetailId", LPBDetailId, DbType.Int32, ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "Proc_LocalPurchaseBillDetail_DeleteById",
                    colparameters, true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}