# Docs for api get list deposits

### 6 Enums for deposit status:

![Alt text](image-2.png)

1. notActive `(Bị huỷ)`:

- Happen:

  - User canceled order.
  - Admin canceled.

<br/>

- Action:

  - Admin: Nothing

<br/>

2. active

- This case happens 2 abilities:
  - `Chưa duyệt`: join_estimate.expired < now
  - `Quá hạn đặt cọc`: join_estimate.expired > now:
    - Admin can cancel this order if now is more than `3 days` to join_estimate.expired

<br />

3. adminConfirm (`Đã duyệt`)

<br />

4. overtime (`Quá hạn tham gia`)

<br />

5. consumerConfirmed (`Người mua xác nhận đã đến`)

<br />

6. supplierConfirned (`Người bán xác nhận đã mua`)
