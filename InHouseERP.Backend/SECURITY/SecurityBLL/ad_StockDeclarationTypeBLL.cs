using System;
using System.Text;
using System.Collections.Generic;
using System.Data;
using System.Data.Common;
using SecurityEntity;
using SecurityDAL;

namespace SecurityBLL
{
	public class ad_StockDeclarationTypeBLL //: IDisposible
	{
		public ad_StockDeclarationTypeDAO  ad_StockDeclarationTypeDAO { get; set; }

		public ad_StockDeclarationTypeBLL()
		{
			//ad_StockDeclarationTypeDAO = ad_StockDeclarationType.GetInstanceThreadSafe;
			ad_StockDeclarationTypeDAO = new ad_StockDeclarationTypeDAO();
		}

		public List<ad_StockDeclarationType> GetAll()
		{
			try
			{
				return ad_StockDeclarationTypeDAO.GetAll();
			}
			catch(Exception ex)
			{
				throw ex;
			}
		}
		public List<ad_StockDeclarationType> GetDynamic(string whereCondition,string orderByExpression)
		{
			try
			{
				return ad_StockDeclarationTypeDAO.GetDynamic(whereCondition, orderByExpression);
			}
			catch(Exception ex)
			{
				throw ex;
			}
		}
		public List<ad_StockDeclarationType> GetPaged(int startRecordNo, int rowPerPage, string whereClause, string sortColumn, string sortOrder, ref int rows)
		{
			try
			{
				return ad_StockDeclarationTypeDAO.GetPaged(startRecordNo, rowPerPage, whereClause, sortColumn, sortOrder, ref rows);
			}
			catch(Exception ex)
			{
				throw ex;
			}
		}
		public int Add(ad_StockDeclarationType _ad_StockDeclarationType)
		{
			try
			{
				return ad_StockDeclarationTypeDAO.Add(_ad_StockDeclarationType);
			}
			catch (Exception ex)
			{
				throw ex;
			}
		}
		public int Update(ad_StockDeclarationType _ad_StockDeclarationType)
		{
			try
			{
				return ad_StockDeclarationTypeDAO.Update(_ad_StockDeclarationType);
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
				return ad_StockDeclarationTypeDAO.Delete(DeclarationTypeId);
			}
			catch (Exception ex)
			{
				throw ex;
			}
		}
	}
}
