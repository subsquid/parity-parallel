import assert from 'assert'
import {EventContext, Result, deprecateLatest} from './support'
import * as v172 from './v172'
import * as v176 from './v176'

export class BalancesTransferEvent {
  constructor(private ctx: EventContext) {
    assert(this.ctx.event.name === 'balances.Transfer')
  }

  /**
   * Transfer succeeded. \[from, to, value\]
   */
  get isV172(): boolean {
    return this.ctx._chain.getEventHash('balances.Transfer') === 'dad2bcdca357505fa3c7832085d0db53ce6f902bd9f5b52823ee8791d351872c'
  }

  /**
   * Transfer succeeded. \[from, to, value\]
   */
  get asV172(): [v172.AccountId32, v172.AccountId32, bigint] {
    assert(this.isV172)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  /**
   * Transfer succeeded.
   */
  get isV176(): boolean {
    return this.ctx._chain.getEventHash('balances.Transfer') === '0ffdf35c495114c2d42a8bf6c241483fd5334ca0198662e14480ad040f1e3a66'
  }

  /**
   * Transfer succeeded.
   */
  get asV176(): {from: v176.AccountId32, to: v176.AccountId32, amount: bigint} {
    assert(this.isV176)
    return this.ctx._chain.decodeEvent(this.ctx.event)
  }

  get isLatest(): boolean {
    deprecateLatest()
    return this.isV176
  }

  get asLatest(): {from: v176.AccountId32, to: v176.AccountId32, amount: bigint} {
    deprecateLatest()
    return this.asV176
  }
}
