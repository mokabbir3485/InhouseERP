using System;
using System.Collections.Generic;
using System.Data;
using DbExecutor;
using PosEntity;

namespace PosDAL
{
    public class pos_ShiftDAO //: IDisposible
    {
        private static volatile pos_ShiftDAO instance;
        private static readonly object lockObj = new object();

        private readonly DBExecutor dbExecutor;

        public pos_ShiftDAO()
        {
            //dbExecutor = DBExecutor.GetInstanceThreadSafe;
            dbExecutor = new DBExecutor();
        }

        public static pos_ShiftDAO GetInstanceThreadSafe
        {
            get
            {
                if (instance == null)
                    lock (lockObj)
                    {
                        if (instance == null) instance = new pos_ShiftDAO();
                    }

                return instance;
            }
        }

        public static pos_ShiftDAO GetInstance()
        {
            if (instance == null) instance = new pos_ShiftDAO();
            return instance;
        }

        public List<pos_Shift> GetAll(long? shiftId = null, int? currencyId = null)
        {
            try
            {
                var pos_ShiftLst = new List<pos_Shift>();
                var colparameters = new Parameters[1]
                {
                    new Parameters("@ShiftId", shiftId, DbType.Int32, ParameterDirection.Input)
                };
                pos_ShiftLst =
                    dbExecutor.FetchData<pos_Shift>(CommandType.StoredProcedure, "pos_Shift_Get", colparameters);
                return pos_ShiftLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<pos_Shift> GetDynamic(string whereCondition, string orderByExpression)
        {
            try
            {
                var pos_ShiftLst = new List<pos_Shift>();
                var colparameters = new Parameters[2]
                {
                    new Parameters("@WhereCondition", whereCondition, DbType.String, ParameterDirection.Input),
                    new Parameters("@OrderByExpression", orderByExpression, DbType.String, ParameterDirection.Input)
                };
                pos_ShiftLst = dbExecutor.FetchData<pos_Shift>(CommandType.StoredProcedure, "pos_Shift_GetDynamic",
                    colparameters);
                return pos_ShiftLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public List<pos_Shift> GetPaged(int startRecordNo, int rowPerPage, string whereClause, string sortColumn,
            string sortOrder, ref int rows)
        {
            try
            {
                var pos_ShiftLst = new List<pos_Shift>();
                var colparameters = new Parameters[5]
                {
                    new Parameters("@StartRecordNo", startRecordNo, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@RowPerPage", rowPerPage, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@WhereClause", whereClause, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortColumn", sortColumn, DbType.String, ParameterDirection.Input),
                    new Parameters("@SortOrder", sortOrder, DbType.String, ParameterDirection.Input)
                };
                pos_ShiftLst = dbExecutor.FetchDataRef<pos_Shift>(CommandType.StoredProcedure, "pos_Shift_GetPaged",
                    colparameters, ref rows);
                return pos_ShiftLst;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Add(pos_Shift _pos_Shift)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[8]
                {
                    new Parameters("@DepartmentId", _pos_Shift.DepartmentId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@UserId", _pos_Shift.UserId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@CurrencyId", _pos_Shift.CurrencyId, DbType.Int32, ParameterDirection.Input),
                    new Parameters("@OpenTime", _pos_Shift.OpenTime, DbType.DateTime, ParameterDirection.Input),
                    new Parameters("@SystemOpenCash", _pos_Shift.SystemOpenCash, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@InputOpenCash", _pos_Shift.InputOpenCash, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@OwnCashIn", _pos_Shift.OwnCashIn, DbType.Decimal, ParameterDirection.Input),
                    new Parameters("@IsClose", _pos_Shift.IsClose, DbType.Boolean, ParameterDirection.Input)
                };
                dbExecutor.ManageTransaction(TransactionType.Open);
                ret = dbExecutor.ExecuteScalar32(true, CommandType.StoredProcedure, "pos_Shift_Create", colparameters,
                    true);
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

        public int Update(pos_Shift _pos_Shift)
        {
            var ret = 0;
            try
            {
                var colparameters = new Parameters[9]
                {
                    new Parameters("@ShiftId", _pos_Shift.ShiftId, DbType.Int64, ParameterDirection.Input),
                    new Parameters("@IsClose", _pos_Shift.IsClose, DbType.Boolean, ParameterDirection.Input),
                    new Parameters("@CloseTime", _pos_Shift.CloseTime, DbType.DateTime, ParameterDirection.Input),
                    new Parameters("@WithdrawnCash", _pos_Shift.WithdrawnCash, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@SystemCloseBalance", _pos_Shift.SystemCloseBalance, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@InputCloseBalance", _pos_Shift.InputCloseBalance, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@SystemCloseCash", _pos_Shift.SystemCloseCash, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@InputCloseCash", _pos_Shift.InputCloseCash, DbType.Decimal,
                        ParameterDirection.Input),
                    new Parameters("@OwnCashOut", _pos_Shift.OwnCashOut, DbType.Decimal, ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "pos_Shift_Update", colparameters, true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Delete(long shiftId)
        {
            try
            {
                var ret = 0;
                var colparameters = new Parameters[1]
                {
                    new Parameters("@ShiftId", shiftId, DbType.Int32, ParameterDirection.Input)
                };
                ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "pos_Shift_DeleteById", colparameters,
                    true);
                return ret;
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}