using System;
using System.Collections.Generic;
using System.Data;
using DbExecutor;
using InventoryEntity;

namespace InventoryDAL
{
    public class inv_StockOpeningQuantityDAO //: IDisposible
    {
        private static volatile inv_StockOpeningQuantityDAO instance;
        private static readonly object lockObj = new object();

        private readonly DBExecutor dbExecutor;

        public inv_StockOpeningQuantityDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public static inv_StockOpeningQuantityDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                    lock (lockObj)
                    {
                        if (instance == null) instance = new inv_StockOpeningQuantityDAO();
                    }

                return instance;
            }
        }

        public static inv_StockOpeningQuantityDAO GetInstance()
        {
            if (instance == null) instance = new inv_StockOpeningQuantityDAO();
            return instance;
        }

        public List<inv_StockOpeningQuantity> GetAll(long? OpeningQtyId = null)
        {
            try
            {
                var inv_OpeningQuantityLst = new List<inv_StockOpeningQuantity>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@OpeningQtyId", OpeningQtyId, DbType.Int32, ParameterDirection.Input)
                };
                inv_OpeningQuantityLst = dbExecutor.FetchData<inv_StockOpeningQuantity>(CommandType.StoredProcedure,
                    "inv_OpeningQuantity_Get", colparameters);
                return inv_OpeningQuantityLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<inv_StockOpeningQuantity> Search(int ItemId, int DepartmentId, int? MaterialTypeId = null, int? LabelBrandId = null)
        {
            try
            {
                var inv_OpeningQuantityLst = new List<inv_StockOpeningQuantity>();
                var colparameters = new Parameters[4]
                {
                    new Parameters("@DepartmentId", DepartmentId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@MaterialTypeId", MaterialTypeId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@LabelBrandId", LabelBrandId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@ItemId", ItemId, DbType.Int32, ParameterDirection.Input)
                };
                inv_OpeningQuantityLst = dbExecutor.FetchData<inv_StockOpeningQuantity>(CommandType.StoredProcedure,
                    "inv_StockOpeningQuantity_Search", colparameters);
                return inv_OpeningQuantityLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<OpeningWarrentyAndSerialNoList> HardwareOpeningStockWarrantyAndSerialGetByStockOpeningQtyId(long StockOpeningQtyId)
        {
            try
            {
                var inv_WarrentyAndSerialNoList = new List<OpeningWarrentyAndSerialNoList>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@StockOpeningQtyId", StockOpeningQtyId, DbType.Int64, ParameterDirection.Input)

                };
                inv_WarrentyAndSerialNoList = dbExecutor.FetchData<OpeningWarrentyAndSerialNoList>(CommandType.StoredProcedure,
                    "inv_HardwareOpeningStockWarrantyAndSerial_GetByStockOpeningQtyId", colparameters);
                return inv_WarrentyAndSerialNoList;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Post(inv_StockOpeningQuantity _inv_StockOpeningQuantity)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[14]
                {
                    new Parameters("@OpeningDate", _inv_StockOpeningQuantity.OpeningDate, DbType.DateTime,
                        ParameterDirection.Input),
                    new Parameters("@StockOpeningQtyId", _inv_StockOpeningQuantity.StockOpeningQtyId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@DepartmentId", _inv_StockOpeningQuantity.DepartmentId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@ItemId", _inv_StockOpeningQuantity.ItemId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@UnitId", _inv_StockOpeningQuantity.UnitId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@PcQty", _inv_StockOpeningQuantity.PcQty, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@RollQty", _inv_StockOpeningQuantity.RollQty,
                        DbType.Decimal, ParameterDirection.Input),
                    new Parameters("@CartonQty", _inv_StockOpeningQuantity.CartonQty,
                        DbType.Decimal, ParameterDirection.Input),
                    new Parameters("@UnitPrice", _inv_StockOpeningQuantity.UnitPrice, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@UpdatorId", _inv_StockOpeningQuantity.UpdatorId, DbType.Int32,
                        ParameterDirection.Input),
                     new Parameters("@MaterialTypeId", _inv_StockOpeningQuantity.MaterialTypeId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@LabelBrandId", _inv_StockOpeningQuantity.LabelBrandId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@CategoryId", _inv_StockOpeningQuantity.CategoryId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@SubCategoryId", _inv_StockOpeningQuantity.SubCategoryId, DbType.Int32,
                        ParameterDirection.Input),
                    
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar32(true, CommandType.StoredProcedure, "inv_StockOpeningQuantity_Post",
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
        public int CreateWarrentyAndSerialNo(OpeningWarrentyAndSerialNoList WarrentyAndSerialNoList)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[5]
                {
                    new Parameters("@StockOpeningQtyId", WarrentyAndSerialNoList.StockOpeningQtyId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@DepartmentId", WarrentyAndSerialNoList.DepartmentId, DbType.Int32,
                        ParameterDirection.Input),
                    new Parameters("@ItemId", WarrentyAndSerialNoList.ItemId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@SerialNo", WarrentyAndSerialNoList.SerialNo, DbType.String,
                        ParameterDirection.Input),
                    new Parameters("@WarrentyInDays", WarrentyAndSerialNoList.WarrentyInDays, DbType.Int32,
                        ParameterDirection.Input)
                    
                    
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar32(true, CommandType.StoredProcedure, "inv_HardwareOpeningStockWarrantyAndSerial_Create",
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

        //public int Update(inv_StockOpeningQuantity _inv_StockOpeningQuantity)
        //{
        //    var ret = 0;
        //    try
        //    {
        //        var colparameters = new Parameters[17]
        //        {
        //            new Parameters("@OpeningQtyId", _inv_StockOpeningQuantity.OpeningQtyId, DbType.Int64,
        //                ParameterDirection.Input),
        //            new Parameters("@DepartmentId", _inv_StockOpeningQuantity.DepartmentId, DbType.Int32,
        //                ParameterDirection.Input),
        //            new Parameters("@ItemId", _inv_StockOpeningQuantity.ItemId, DbType.Int32, ParameterDirection.Input),
        //            new Parameters("@OpeningUnitId", _inv_StockOpeningQuantity.OpeningUnitId, DbType.Int32,
        //                ParameterDirection.Input),
        //            new Parameters("@OpeningUnitQuantity", _inv_StockOpeningQuantity.OpeningUnitQuantity, DbType.Decimal,
        //                ParameterDirection.Input),
        //            new Parameters("@OpeningPackageId", _inv_StockOpeningQuantity.OpeningPackageId, DbType.Int32,
        //                ParameterDirection.Input),
        //            new Parameters("@OpeningPackageQuantity", _inv_StockOpeningQuantity.OpeningPackageQuantity,
        //                DbType.Decimal, ParameterDirection.Input),
        //            new Parameters("@OpeningContainerId", _inv_StockOpeningQuantity.OpeningContainerId, DbType.Int32,
        //                ParameterDirection.Input),
        //            new Parameters("@OpeningContainerQuantity", _inv_StockOpeningQuantity.OpeningContainerQuantity,
        //                DbType.Decimal, ParameterDirection.Input),
        //            new Parameters("@OpeningValue", _inv_StockOpeningQuantity.OpeningValue, DbType.Decimal,
        //                ParameterDirection.Input),
        //            new Parameters("@UpdatorId", _inv_StockOpeningQuantity.UpdatorId, DbType.Int32,
        //                ParameterDirection.Input),
        //            new Parameters("@UpdateDate", _inv_StockOpeningQuantity.UpdateDate, DbType.DateTime,
        //                ParameterDirection.Input),
        //            new Parameters("@DepartmentName", _inv_StockOpeningQuantity.DepartmentName, DbType.String,
        //                ParameterDirection.Input),
        //            new Parameters("@ItemName", _inv_StockOpeningQuantity.ItemName, DbType.String, ParameterDirection.Input),
        //            new Parameters("@OpeningUnitName", _inv_StockOpeningQuantity.OpeningUnitName, DbType.String,
        //                ParameterDirection.Input),
        //            new Parameters("@OpeningPackageName", _inv_StockOpeningQuantity.OpeningPackageName, DbType.String,
        //                ParameterDirection.Input),
        //            new Parameters("@OpeningContainerName", _inv_StockOpeningQuantity.OpeningContainerName, DbType.String,
        //                ParameterDirection.Input)
        //        };
        //        ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "inv_OpeningQuantity_Update",
        //            colparameters, true);
        //        return ret;
        //    }
        //    catch (Exception ex)
        //    {
        //        throw ex;
        //    }
        //}

        public int Delete(long OpeningQtyId)
        {
            try
            {
                var ret = 0;
                var colparameters = new Parameters[1]
                {
                    new Parameters("@OpeningQtyId", OpeningQtyId, DbType.Int32, ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "inv_OpeningQuantity_DeleteById",
                    colparameters, true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<Inv_HardwareWarrantyAndSerial> GetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                var Inv_HardwareWarrantyAndSerial = new List<Inv_HardwareWarrantyAndSerial>();
                var colparameters = new Parameters[2]
                {
                    new Parameters("@WhereCondition", whereCondition, DbType.String, ParameterDirection.Input),
                    new Parameters("@OrderByExpression", orderByExpression, DbType.String, ParameterDirection.Input)
                };
                Inv_HardwareWarrantyAndSerial = dbExecutor.FetchData<Inv_HardwareWarrantyAndSerial>(
                    CommandType.StoredProcedure, "Inv_HardwareWarrantyAndSerial_GetDynamic", colparameters);
                return Inv_HardwareWarrantyAndSerial;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
        public List<inv_StockOpeningQuantity> GetPaged(int startRecordNo, int rowPerPage, string whereClause, string sortColumn, string sortOrder, ref int rows)
        {
            try
            {
                List<inv_StockOpeningQuantity> pos_StockOpeningLst = new List<inv_StockOpeningQuantity>();
                Parameters[] colparameters = new Parameters[5]{
                new Parameters("@StartRecordNo", startRecordNo, DbType.Int32, ParameterDirection.Input),
                new Parameters("@RowPerPage", rowPerPage, DbType.Int32, ParameterDirection.Input),
                new Parameters("@WhereClause", whereClause, DbType.String, ParameterDirection.Input),
                new Parameters("@SortColumn", sortColumn, DbType.String, ParameterDirection.Input),
                new Parameters("@SortOrder", sortOrder, DbType.String, ParameterDirection.Input),
                };
                pos_StockOpeningLst = dbExecutor.FetchDataRef<inv_StockOpeningQuantity>(CommandType.StoredProcedure, "inv_StockOpeningQuantity_GetPaged", colparameters, ref rows);
                return pos_StockOpeningLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}