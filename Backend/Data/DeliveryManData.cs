﻿using Backend.Models;
using Npgsql;
using System.Data;
using Backend.Helpers;
using System.Net.Sockets;
using Microsoft.AspNetCore.Identity;

namespace Backend.Data
{
    public class DeliveryManData
    {
        public static List<DeliveryMan> GetAll()
        {
            List<DeliveryMan> deliveryManList = new List<DeliveryMan>();

            var connection = Connection.Get();
            NpgsqlCommand cmd = new NpgsqlCommand("Get_All_Deliverymen", connection);
            cmd.CommandType = CommandType.StoredProcedure;


            try
            {
                connection.Open();
                cmd.ExecuteNonQuery();
                var dr = cmd.ExecuteReader();

                while (dr.Read())
                {
                    deliveryManList.Add(new DeliveryMan()
                    {
                        id = Convert.ToInt32(dr["Id"]),
                        username = dr["Username"].ToString()!,
                        name = dr["Name"].ToString()!,
                        lastName1 = dr["LastName1"].ToString()!,
                        lastName2 = dr["LastName2"].ToString()!,
                        email = dr["Email"].ToString()!,
                        province = dr["Province"].ToString()!,
                        city = dr["City"].ToString()!,
                        district = dr["District"].ToString()!,
                        phoneNumber = (List<string>)dr["PhoneNumbers"]

                    });
                }

                connection.Close();

                return deliveryManList;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw new Exception("Error al listar los repartidores");
            }
        }

        public static DeliveryMan Get(int id)
        {
            DeliveryMan delman = new DeliveryMan();

            var connection = Connection.Get();
            NpgsqlCommand cmd = new NpgsqlCommand("Get_Deliveryman", connection);
            cmd.CommandType = CommandType.StoredProcedure;
            cmd.Parameters.AddWithValue("in_id", id);

            try
            {
                connection.Open();
                cmd.ExecuteNonQuery();
                var dr = cmd.ExecuteReader();

                while (dr.Read())
                {
                    delman = new DeliveryMan()
                    {
                        id = Convert.ToInt32(dr["Id"]),
                        username = dr["Username"].ToString()!,
                        name = dr["Name"].ToString()!,
                        lastName1 = dr["LastName1"].ToString()!,
                        lastName2 = dr["LastName2"].ToString()!,
                        email = dr["Email"].ToString()!,
                        province = dr["Province"].ToString()!,
                        city = dr["City"].ToString()!,
                        district = dr["District"].ToString()!,
                        phoneNumber = (List<string>)dr["PhoneNumbers"]
                    };
                }

                connection.Close();

                return delman;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                throw new Exception("Error al obtener el repartidor");
            }
        }

        public static bool Add(DeliveryMan delman)
        {

            string passwordD = EmailSender.GenerateRandomPassword();

            _ = EmailSender.SendEmailAsync(delman.name, delman.username, "Envío de contraseña UbyTEC", "Contraseña: " + passwordD);

            var connection = Connection.Get();
            NpgsqlCommand cmd = new NpgsqlCommand(
              $@"CALL Insert_Deliveryman(
          {delman.id},
          '{delman.name}',
          '{delman.lastName1}',
          '{delman.lastName2}',
          '{delman.email}',
          '{delman.province}',
          '{delman.city}',
          '{delman.district}',
          '{delman.username}',
          '{passwordD}',
          '{delman.phoneNumber}'
        );", connection
            );
            try
            {
                connection.Open();
                cmd.ExecuteNonQuery();
                connection.Close();
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return false;
            }
        }

        public static bool Edit(DeliveryMan delman, int id)
        {

            DeliveryMan current = DeliveryManData.Get(id);

            string passUpdate = current.password;
            if (delman.password != "" && delman.oldPassword == current.password)
            {
                passUpdate = delman.password;
            }

            var connection = Connection.Get();
            NpgsqlCommand cmd = new NpgsqlCommand(
              $@"CALL Update_Deliveryman(
          {id},
          {delman.id},
          '{delman.name}',
          '{delman.lastName1}',
          '{delman.lastName2}',
          '{delman.email}',
          '{delman.province}',
          '{delman.city}',
          '{delman.district}',
          '{delman.username}',
          '{passUpdate}',
          '{delman.phoneNumber}'
        );", connection
            );
            try
            {
                connection.Open();
                cmd.ExecuteNonQuery();
                connection.Close();
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return false;
            }
        }

        public static bool Delete(int id)
        {
            var connection = Connection.Get();
            NpgsqlCommand cmd = new NpgsqlCommand(
              $@"CALL Delete_Deliveryman({id});", connection);

            try
            {
                connection.Open();
                cmd.ExecuteNonQuery();
                connection.Close();
                return true;
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex.Message);
                return false;
            }
        }

        


    }
}
