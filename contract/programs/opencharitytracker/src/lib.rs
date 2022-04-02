use anchor_lang::prelude::*;

declare_id!("Dgw1WKu8qJg3XR1djgRbmP9cysmjep4TXASHEpe45ZVG");

#[program]
pub mod opencharitytracker {
  use super::*;
  pub fn start_open_charity_tracker(ctx: Context<StartOpenCharityTracker>) -> Result<()> {
    let base_account = &mut ctx.accounts.base_account;
    base_account.sum = 0;
    let owner = *ctx.accounts.user.key;
    base_account.owner = owner;
    Ok(())
  }

  pub fn add_transaction(ctx: Context<AddTransaction>, amount: u64, hash: String) -> Result<()> {
    let owner = *ctx.accounts.user.key;
    let base_account = &mut ctx.accounts.base_account;
    if base_account.owner != owner {
      return Err(error!(ErrorCode::PermissionDenied));
    }

    let tsn = TransactionStruct {
      amount,
      hash
    };
		
    base_account.transactions.push(tsn);
    base_account.sum += amount;
    Ok(())
  }
}

#[error_code]
pub enum ErrorCode {
    #[msg("You are not the creator of the suggested account")]
    PermissionDenied,
}

#[derive(Accounts)]
pub struct StartOpenCharityTracker<'info> {
  #[account(init, payer = user, space = 9000)]
  pub base_account: Account<'info, BaseAccount>,
  #[account(mut)]
  pub user: Signer<'info>,
  pub system_program: Program <'info, System>,
}

#[derive(Accounts)]
pub struct AddTransaction<'info> {
  #[account(mut)]
  pub base_account: Account<'info, BaseAccount>,
  #[account(mut)]
  pub user: Signer<'info>,
}

#[derive(Debug, Clone, AnchorSerialize, AnchorDeserialize)]
pub struct TransactionStruct {
    pub amount: u64,
    pub hash: String,
}

#[account]
pub struct BaseAccount {
    pub owner: Pubkey,
    pub sum: u64,
    pub transactions: Vec<TransactionStruct>,
}