using System;
using System.Collections.Generic;
using PosDAL;
using PosEntity;

namespace PosBLL
{
    public class pos_ShiftBLL //: IDisposible
    {
        public pos_ShiftBLL()
        {
            //pos_ShiftDAO = pos_Shift.GetInstanceThreadSafe;
            pos_ShiftDAO = new pos_ShiftDAO();
        }

        public pos_ShiftDAO pos_ShiftDAO { get; set; }

        public List<pos_Shift> GetAll()
        {
            try
            {
                return pos_ShiftDAO.GetAll();
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
                return pos_ShiftDAO.GetDynamic(whereCondition, orderByExpression);
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
                return pos_ShiftDAO.GetPaged(startRecordNo, rowPerPage, whereClause, sortColumn, sortOrder, ref rows);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Add(pos_Shift _pos_Shift)
        {
            try
            {
                return pos_ShiftDAO.Add(_pos_Shift);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }

        public int Update(pos_Shift _pos_Shift)
        {
            try
            {
                return pos_ShiftDAO.Update(_pos_Shift);
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
                return pos_ShiftDAO.Delete(shiftId);
            }
            catch (Exception ex)
            {
                throw ex;
            }
        }
    }
}