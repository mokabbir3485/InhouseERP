using System;
using System.Text;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Data.SqlClient;
using System.Data.Common;
using SecurityEntity;
using DbExecutor;

namespace SecurityDAL
{
	public class ad_StockDeclarationTypeDAO //: IDisposible
	{
		private static volatile ad_StockDeclarationTypeDAO instance;
		private static readonly object lockObj = new object();
		public static ad_StockDeclarationTypeDAO GetInstance()
		{
			if (instance == null)
			{
				instance = new ad_StockDeclarationTypeDAO();
			}
			return instance;
		}
		public static ad_StockDeclarationTypeDAO GetInstanceThreadSafe
		{
			get
			{
				if (instance == null)
				{
					lock (lockObj)
					{
						if (instance == null)
						{
							instance = new ad_StockDeclarationTypeDAO();
						}
					}
				}
				return instance;
			}
		}

		DBExecutor dbExecutor;
		public ad_StockDeclarationTypeDAO()
		{
			//dbExecutor = DBExecutor.GetInstanceThreadSafe;
			dbExecutor = new DBExecutor();
		}
		public List<ad_StockDeclarationType> GetAll(Int32? DeclarationTypeId = null)
		{
			try
			{
				List<ad_StockDeclarationType> ad_StockDeclarationTypeLst = new List<ad_StockDeclarationType>();
				Parameters[] colparameters = new Parameters[1]{
				new Parameters("@DeclarationTypeId", DeclarationTypeId, DbType.Int32, ParameterDirection.Input)
				};
				ad_StockDeclarationTypeLst = dbExecutor.FetchData<ad_StockDeclarationType>(CommandType.StoredProcedure, "ad_DeclarationGetAll", colparameters);
				return ad_StockDeclarationTypeLst;
			}
			catch (Exception ex)
			{
				throw ex;
			}
		}
		public List<ad_StockDeclarationType> GetDynamic(string whereCondition,string orderByExpression)
		{
			try
			{
				List<ad_StockDeclarationType> ad_StockDeclarationTypeLst = new List<ad_StockDeclarationType>();
				Parameters[] colparameters = new Parameters[2]{
				new Parameters("@WhereCondition", whereCondition, DbType.String, ParameterDirection.Input),
				new Parameters("@OrderByExpression", orderByExpression, DbType.String, ParameterDirection.Input),
				};
				ad_StockDeclarationTypeLst = dbExecutor.FetchData<ad_StockDeclarationType>(CommandType.StoredProcedure, "ad_StockDeclarationType_GetDynamic", colparameters);
				return ad_StockDeclarationTypeLst;
			}
			catch (Exception ex)
			{
				throw ex;
			}
		}
		public List<ad_StockDeclarationType> GetPaged(int startRecordNo, int rowPerPage, string whereClause, string sortColumn, string sortOrder, ref int rows)
		{
			try
			{
				List<ad_StockDeclarationType> ad_StockDeclarationTypeLst = new List<ad_StockDeclarationType>();
				Parameters[] colparameters = new Parameters[5]{
				new Parameters("@StartRecordNo", startRecordNo, DbType.Int32, ParameterDirection.Input),
				new Parameters("@RowPerPage", rowPerPage, DbType.Int32, ParameterDirection.Input),
				new Parameters("@WhereClause", whereClause, DbType.String, ParameterDirection.Input),
				new Parameters("@SortColumn", sortColumn, DbType.String, ParameterDirection.Input),
				new Parameters("@SortOrder", sortOrder, DbType.String, ParameterDirection.Input),
				};
				ad_StockDeclarationTypeLst = dbExecutor.FetchDataRef<ad_StockDeclarationType>(CommandType.StoredProcedure, "ad_StockDeclarationType_GetPaged", colparameters, ref rows);
				return ad_StockDeclarationTypeLst;
			}
			catch (Exception ex)
			{
				throw ex;
			}
		}
		public int Add(ad_StockDeclarationType _ad_StockDeclarationType)
		{
			int ret = 0;
			try
			{
				Parameters[] colparameters = new Parameters[6]{
				new Parameters("@DeclarationTypeName", _ad_StockDeclarationType.DeclarationTypeName, DbType.String, ParameterDirection.Input),
				new Parameters("@IsActive", _ad_StockDeclarationType.IsActive, DbType.Boolean, ParameterDirection.Input),
				new Parameters("@CreatorId", _ad_StockDeclarationType.CreatorId, DbType.Int32, ParameterDirection.Input),
				new Parameters("@CreateDate", _ad_StockDeclarationType.CreateDate, DbType.DateTime, ParameterDirection.Input),
				new Parameters("@UpdatorId", _ad_StockDeclarationType.UpdatorId, DbType.Int32, ParameterDirection.Input),
				new Parameters("@UpdateDate", _ad_StockDeclarationType.UpdateDate, DbType.DateTime, ParameterDirection.Input)
				};
				dbExecutor.ManageTransaction(TransactionType.Open);
				ret = dbExecutor.ExecuteScalar32(true, CommandType.StoredProcedure, "ad_StockDeclarationType_Create", colparameters, true);
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
		public int Update(ad_StockDeclarationType _ad_StockDeclarationType)
		{
			int ret = 0;
			try
			{
				Parameters[] colparameters = new Parameters[5]{
				new Parameters("@DeclarationTypeId", _ad_StockDeclarationType.DeclarationTypeId, DbType.Int32, ParameterDirection.Input),
				new Parameters("@DeclarationTypeName", _ad_StockDeclarationType.DeclarationTypeName, DbType.String, ParameterDirection.Input),
				new Parameters("@IsActive", _ad_StockDeclarationType.IsActive, DbType.Boolean, ParameterDirection.Input),
				new Parameters("@UpdatorId", _ad_StockDeclarationType.UpdatorId, DbType.Int32, ParameterDirection.Input),
				new Parameters("@UpdateDate", _ad_StockDeclarationType.UpdateDate, DbType.DateTime, ParameterDirection.Input)
				};
				ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "ad_StockDeclarationType_Update", colparameters, true);
			return ret;
			}
			catch (Exception ex)
			{
				throw ex;
			}
		}
		public int Delete(Int32 DeclarationTypeId)
		{
			try
			{
				int ret = 0;
				Parameters[] colparameters = new Parameters[1]{
				new Parameters("@DeclarationTypeId", DeclarationTypeId, DbType.Int32, ParameterDirection.Input)
				};
				ret = dbExecutor.ExecuteNonQuery(CommandType.StoredProcedure, "ad_StockDeclarationType_DeleteById", colparameters, true);
				return ret;
			}
			catch (Exception ex)
			{
				throw ex;
			}
		}
	}
}
