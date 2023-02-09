using System;
using System.Collections.Generic;
using System.Data;
using DbExecutor;
using InventoryEntity;

namespace InventoryDAL
{
    public class proc_ImportPurchaseBillDetailSerialDAO //: IDisposible
    {
        private static volatile proc_ImportPurchaseBillDetailSerialDAO instance;
        private static readonly object lockObj = new object();

        private readonly DBExecutor dbExecutor;

        public proc_ImportPurchaseBillDetailSerialDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public static proc_ImportPurchaseBillDetailSerialDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                    lock (lockObj)
                    {
                        if (instance == null) instance = new proc_ImportPurchaseBillDetailSerialDAO();
                    }

                return instance;
            }
        }

        public static proc_ImportPurchaseBillDetailSerialDAO GetInstance()
        {
            if (instance == null) instance = new proc_ImportPurchaseBillDetailSerialDAO();
            return instance;
        }

        public List<proc_ImportPurchaseBillDetailSerial> GetAll(long? pBDetailSerialId = null)
        {
            try
            {
                var inv_PurchaseBillDetailSerialLst = new List<proc_ImportPurchaseBillDetailSerial>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@PBDetailId", pBDetailSerialId, DbType.Int64, ParameterDirection.Input)
                };
                inv_PurchaseBillDetailSerialLst =
                    dbExecutor.FetchData<proc_ImportPurchaseBillDetailSerial>(CommandType.StoredProcedure,
                        "proc_ImportPurchaseBillDetailSerial_Get", colparameters);
                return inv_PurchaseBillDetailSerialLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<proc_ImportPurchaseBillDetailSerial> GetBySerialAndWarrantyId(long PBDetailId)
        {
            try
            {
                var inv_PurchaseBillDetailSerialLst = new List<proc_ImportPurchaseBillDetailSerial>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@PBDetailId", PBDetailId, DbType.Int64, ParameterDirection.Input)
                };
                inv_PurchaseBillDetailSerialLst =
                    dbExecutor.FetchData<proc_ImportPurchaseBillDetailSerial>(CommandType.StoredProcedure,
                        "inv_PurchaseBillDetailSerialGetById", colparameters);
                return inv_PurchaseBillDetailSerialLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<proc_ImportPurchaseBillDetailSerial> GetAllWarrentryReport(Int64 PBDetailSerialId, Int32 ItemId,bool isLocal)
        {
            try
            {
              
                List<proc_ImportPurchaseBillDetailSerial> inv_PurchaseBillDetailSerialLst = new List<proc_ImportPurchaseBillDetailSerial>();
                Parameters[] colparameters = new Parameters[3]{
                new Parameters("@PBDetailSerialId", PBDetailSerialId, DbType.Int32, ParameterDirection.Input),
                new Parameters("@ItemId", ItemId, DbType.Int32, ParameterDirection.Input),
                new Parameters("@IsLocal", isLocal, DbType.Boolean, ParameterDirection.Input)
                };
                inv_PurchaseBillDetailSerialLst = dbExecutor.FetchData<proc_ImportPurchaseBillDetailSerial>(CommandType.StoredProcedure, "xRpt_PurchaseBillWarrantyAndSerial_GetById", colparameters);
                return inv_PurchaseBillDetailSerialLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<proc_ImportPurchaseBillDetailSerial> GetDynamic(string whereCondition, string orderByExpression)
        {
            //For Dublicate Check and Get Adjustment and Delivary
            try
            {
                var inv_PurchaseBillDetailSerialLst = new List<proc_ImportPurchaseBillDetailSerial>();
                var colparameters = new Parameters[2]
                {
                    new Parameters("@WhereCondition", whereCondition, DbType.String, ParameterDirection.Input),
                    new Parameters("@OrderByExpression", orderByExpression, DbType.String, ParameterDirection.Input)
                };
                inv_PurchaseBillDetailSerialLst = dbExecutor.FetchData<proc_ImportPurchaseBillDetailSerial>(
                    CommandType.StoredProcedure, "Inv_HardwareWarrantyAndSerial_GetDynamic", colparameters);
                return inv_PurchaseBillDetailSerialLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<proc_ImportPurchaseBillDetailSerial> ImportGetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                var inv_PurchaseBillDetailSerialLst = new List<proc_ImportPurchaseBillDetailSerial>();
                var colparameters = new Parameters[2]
                {
                    new Parameters("@WhereCondition", whereCondition, DbType.String, ParameterDirection.Input),
                    new Parameters("@OrderByExpression", orderByExpression, DbType.String, ParameterDirection.Input)
                };
                inv_PurchaseBillDetailSerialLst = dbExecutor.FetchData<proc_ImportPurchaseBillDetailSerial>(
                    CommandType.StoredProcedure, "proc_ImportPurchaseBillDetailSerial_GetDynamic", colparameters);
                return inv_PurchaseBillDetailSerialLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<inv_LocalPurchaseBillDetailSerial> LocalGetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                var inv_LocalPurchaseBillDetailSerialLst = new List<inv_LocalPurchaseBillDetailSerial>();
                var colparameters = new Parameters[2]
                {
                    new Parameters("@WhereCondition", whereCondition, DbType.String, ParameterDirection.Input),
                    new Parameters("@OrderByExpression", orderByExpression, DbType.String, ParameterDirection.Input)
                };
                inv_LocalPurchaseBillDetailSerialLst = dbExecutor.FetchData<inv_LocalPurchaseBillDetailSerial>(
                    CommandType.StoredProcedure, "proc_LocalPurchaseBillDetailSerial_GetDynamic", colparameters);
                return inv_LocalPurchaseBillDetailSerialLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
       
        public List<inv_LocalPurchaseBillDetailSerial> GetHardwareWarrantyAndSerial_GetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                var inv_LocalPurchaseBillDetailSerialLst = new List<inv_LocalPurchaseBillDetailSerial>();
                var colparameters = new Parameters[2]
                {
                    new Parameters("@WhereCondition", whereCondition, DbType.String, ParameterDirection.Input),
                    new Parameters("@OrderByExpression", orderByExpression, DbType.String, ParameterDirection.Input)
                };
                inv_LocalPurchaseBillDetailSerialLst = dbExecutor.FetchData<inv_LocalPurchaseBillDetailSerial>(
                    CommandType.StoredProcedure, "Inv_HardwareWarrantyAndSerial_GetDynamic", colparameters);
                return inv_LocalPurchaseBillDetailSerialLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<proc_ImportPurchaseBillDetailSerial> GetPaged(int startRecordNo, int rowPerPage, string whereClause,
            string sortColumn, string sortOrder, ref int rows)
        {
            try
            {
                var inv_PurchaseBillDetailSerialLst = new List<proc_ImportPurchaseBillDetailSerial>();
                var colparameters = new Parameters[5]
                {
                    new Parameters("@StartRecordNo", startRecordNo, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@RowPerPage", rowPerPage, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@WhereClause", whereClause, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortColumn", sortColumn, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortOrder", sortOrder, DbType.String, ParameterDirection.Input)
                };
                inv_PurchaseBillDetailSerialLst = dbExecutor.FetchDataRef<proc_ImportPurchaseBillDetailSerial>(
                    CommandType.StoredProcedure, "proc_PurchaseBillDetailSerialLocalAndImport_GetPaged", colparameters,
                    ref rows);
                return inv_PurchaseBillDetailSerialLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public long Add(proc_ImportPurchaseBillDetailSerial _inv_PurchaseBillDetailSerial)
        {
            long ret = 0;
            try
            {
                var colparameters = new Parameters[5]
                {
                    new Parameters("@ItemId", _inv_PurchaseBillDetailSerial.ItemId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@PBDetailId", _inv_PurchaseBillDetailSerial.PBDetailId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@SerialNo", _inv_PurchaseBillDetailSerial.SerialNo, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@WarrentyInDays", _inv_PurchaseBillDetailSerial.WarrentyInDays, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@DepartmentId", _inv_PurchaseBillDetailSerial.DepartmentId, DbType.Int32,
                        ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar64(true, CommandType.StoredProcedure,
                    "proc_ImportPurchaseBillDetailSerial_Create", colparameters, true);
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


        public long AddForLocalPurchaseBill(inv_LocalPurchaseBillDetailSerial _inv_LocalPurchaseBillDetailSerial)
        {
            long ret = 0;
            try
            {
                var colparameters = new Parameters[5]
                {
                    new Parameters("@ItemId", _inv_LocalPurchaseBillDetailSerial.ItemId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@LPBDetailId", _inv_LocalPurchaseBillDetailSerial.LPBDetailId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@SerialNo", _inv_LocalPurchaseBillDetailSerial.SerialNo, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@WarrentyInDays", _inv_LocalPurchaseBillDetailSerial.WarrentyInDays, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@DepartmentId", _inv_LocalPurchaseBillDetailSerial.DepartmentId, DbType.Int32,
                        ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar64(true, CommandType.StoredProcedure,
                    "proc_LocalPurchaseBillDetailSerial_Create", colparameters, true);
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


        public long Update(proc_ImportPurchaseBillDetailSerial _inv_PurchaseBillDetailSerial)
        {
            long ret = 0;
            try
            {
                var colparameters = new Parameters[4]
                {
                    new Parameters("@PBDetailSerialId", _inv_PurchaseBillDetailSerial.PBDetailSerialId, DbType.Int64,
                        ParameterDirection.Input),
                    new Parameters("@SerialNo", _inv_PurchaseBillDetailSerial.SerialNo, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@WarrentyInDays", _inv_PurchaseBillDetailSerial.WarrentyInDays, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@IsLocal", _inv_PurchaseBillDetailSerial.IsLocal, DbType.Boolean,
                        ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar64(true, CommandType.StoredProcedure,
                    "proc_PurchaseBillDetailSerial_Update", colparameters, true);
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

        public int UpdateDepartment(long pBDetailSerialId, int departmentId)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[2]
                {
                    new Parameters("@PBDetailSerialId", pBDetailSerialId, DbType.Int64, ParameterDirection.Input),
                    new Parameters("@DepartmentId", departmentId, DbType.Int32, ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure,
                    "proc_PurchaseBillDetailSerial_UpdateDepartment", colparameters, true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int LocalUpdateDepartment(long LPBDetailSerialId, int departmentId)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[2]
                {
                    new Parameters("@LPBDetailSerialId", LPBDetailSerialId, DbType.Int64, ParameterDirection.Input),
                    new Parameters("@DepartmentId", departmentId, DbType.Int32, ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure,
                    "proc_LocalPurchaseBillDetailSerial_UpdateDepartment", colparameters, true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(long pBDetailSerialId)
        {
            try
            {
                var ret = 0;
                var colparameters = new Parameters[1]
                {
                    new Parameters("@PBDetailSerialId", pBDetailSerialId, DbType.Int32, ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "inv_PurchaseBillDetailSerial_DeleteById",
                    colparameters, true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<proc_ImportPurchaseBillDetailSerial> GetByItemAddAttId(int itemAddAttId)
        {
            try
            {
                var inv_PurchaseBillDetailSerialLst = new List<proc_ImportPurchaseBillDetailSerial>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@ItemAddAttId", itemAddAttId, DbType.Int32, ParameterDirection.Input)
                };
                inv_PurchaseBillDetailSerialLst = dbExecutor.FetchData<proc_ImportPurchaseBillDetailSerial>(
                    CommandType.StoredProcedure, "proc_ImportPurchaseBillDetailSerial_GetByItemAddAttId", colparameters);
                return inv_PurchaseBillDetailSerialLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int CreateDeliveryWarrantyAndSerial(proc_ImportPurchaseBillDetailSerial _inv_PurchaseBillDetailSerial)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[5]
                {
                    new Parameters("@DeliveryDetailId", _inv_PurchaseBillDetailSerial.DeliveryDetailId, DbType.Int64, ParameterDirection.Input),
                    new Parameters("@DepartmentId",_inv_PurchaseBillDetailSerial.DepartmentId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@ItemId",_inv_PurchaseBillDetailSerial.ItemId, DbType.Int64, ParameterDirection.Input),
                    new Parameters("@SerialNo",_inv_PurchaseBillDetailSerial.SerialNo, DbType.String, ParameterDirection.Input),
                    new Parameters("@WarrentyInDays",_inv_PurchaseBillDetailSerial.WarrentyInDays, DbType.Int32, ParameterDirection.Input),

                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure,
                    "inv_HardwareDeliveryWarrantyAndSerial_Create", colparameters, true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}